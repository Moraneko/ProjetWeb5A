package Tarby_Gregoire_Web.Projet.controller;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import Tarby_Gregoire_Web.Projet.SampleAuthenticationManager;
import Tarby_Gregoire_Web.Projet.model.*;
import Tarby_Gregoire_Web.Projet.repository.ChevalRepository;
import Tarby_Gregoire_Web.Projet.repository.CombinaisonRepository;
import Tarby_Gregoire_Web.Projet.repository.CoursRepository;
import Tarby_Gregoire_Web.Projet.repository.UtilisateurRepository;
import net.minidev.json.JSONObject;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class MainController {
	@Autowired
	private static AuthenticationManager am = new SampleAuthenticationManager();
	@Autowired
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ChevalRepository chevalRepository;
	@Autowired
	private CoursRepository coursRepository;
	@Autowired
	private CombinaisonRepository combinaisonRepository;




	public List<UtilisateurSimple> convertUserInUserSimple(List<Utilisateur> utilisateurListBDD){
		List<UtilisateurSimple> utilisateurSimpleListBDD = new ArrayList<>();
		for(Utilisateur utilisateurBDD : utilisateurListBDD ){
			UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());
			utilisateurSimpleListBDD.add(utilisateurSimpleBDD);
		}
		return utilisateurSimpleListBDD;
	}


	@ResponseBody
	@PostMapping("/connectionApi")
	public ResponseEntity<UsernamePasswordAuthenticationToken> Login(@Validated @RequestBody JSONObject body) {

		String identifiant = body.getAsString("identifiant"); //email ou num tel
		String mdp = body.getAsString("mdp");

		if (utilisateurRepository.getIdUtilisateurbyEmailOrTel(identifiant) == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); //404
		}

		String mdpBDD = utilisateurRepository.getMDP(identifiant);
		UsernamePasswordAuthenticationToken token = null;
		if (passwordEncoder.matches(mdp, mdpBDD) == false) {
			System.out.println("pas de correspondance");
		} else {
			//System.out.println("token");
			token = new UsernamePasswordAuthenticationToken(identifiant, mdpBDD);
		//	System.out.println(token);
			Authentication result = this.am.authenticate(token);
			SecurityContextHolder.getContext().setAuthentication(result);
			Utilisateur utilisateur = utilisateurRepository.findUtilisateurByIdUtilisateur(utilisateurRepository.getIdUtilisateurbyEmailOrTel(identifiant));
			token.setDetails(utilisateur);
		}

		return new ResponseEntity<>(token, HttpStatus.OK); //200
	}

	@ResponseBody
	@PostMapping({"/formulaire", "/admin/addAdmin", "/admin/newMoniteur"})
	public ResponseEntity<Utilisateur> createUtilisateur(@Validated @RequestBody Utilisateur utilisateur) {
		if (utilisateurRepository.findUtilisateurByEmail(utilisateur.getEmail()) != null || utilisateurRepository.findUtilisateurByTelephone(utilisateur.getTelephone()) != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}

		Utilisateur utilisateurRequest = new Utilisateur(utilisateur.getPrenom(), utilisateur.getNom(), utilisateur.getEmail(), utilisateur.getTelephone(), utilisateur.getLicence(), passwordEncoder.encode(utilisateur.getMdp()), utilisateur.getRole());
		utilisateurRepository.save(utilisateurRequest);

		return new ResponseEntity<>(utilisateurRepository.findUtilisateurByEmail(utilisateur.getEmail()), HttpStatus.CREATED); //201
	}


	@ResponseBody
	@PutMapping({"/admin/changeUserInfo","/user/modifUser","/moniteur/modifUser"})
	public ResponseEntity<Utilisateur> updateUtilisateur(@Validated @RequestBody Utilisateur utilisateur) {
		boolean infoChanged = false;
		Utilisateur utilisateurBDD = utilisateurRepository.findUtilisateurByIdUtilisateur(utilisateur.getId());

		if (utilisateurRepository.findUtilisateurByEmail(utilisateur.getEmail()) == null || utilisateur.getEmail()==utilisateurBDD.getEmail()) {
			if( !(utilisateur.getEmail()==utilisateurBDD.getEmail()) ){
				infoChanged = true;
			}
			utilisateurBDD.setEmail(utilisateur.getEmail());
		}
		if (utilisateurRepository.findUtilisateurByTelephone(utilisateur.getTelephone()) == null || utilisateur.getTelephone().equals(utilisateurBDD.getTelephone())) {
			if( !(utilisateur.getTelephone().equals(utilisateurBDD.getTelephone())) ){
				infoChanged = true;
			}
			utilisateurBDD.setTelephone(utilisateur.getTelephone());
		}
		if (!(utilisateur.getLicence().equals(utilisateurBDD.getLicence()))) {
			utilisateurBDD.setLicence(utilisateur.getLicence());
			infoChanged = true;
		}

		if(!infoChanged){
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}

		utilisateurRepository.save(utilisateurBDD);

		return new ResponseEntity<>(utilisateurRepository.findUtilisateurByIdUtilisateur(utilisateur.getId()), HttpStatus.ACCEPTED);

	}


	@ResponseBody
	@GetMapping("/cours/getAllCours")
	public ResponseEntity<List<CoursAvecInfoMoniteur>> getAllCours() throws ParseException {


		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		Date dateparse=format.parse(format.format(date));



		List<Cours> allCours = coursRepository.findAll();
		List<CoursAvecInfoMoniteur> allCoursInfo= new ArrayList<>();
		for (Cours cours : allCours){
			if(combinaisonRepository.findCombinaisonByIdCours(cours.getId()).size()<cours.getMax_cavalier() && cours.getEtat()!=1 && cours.getDateDebut().after(dateparse)){
				String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
				String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

				CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(), cours.getIdMoniteur(), cours.getDateDebut().toString(), cours.getDateFin().toString(), cours.getMax_cavalier(), cours.getNiveau(), cours.getTitre(), cours.getRecurrent(), prenomMoniteur, nomMoniteur, cours.getEtat());
				allCoursInfo.add(coursinfo);
			}
		}
		return new ResponseEntity<>(allCoursInfo, HttpStatus.OK);
	}




	@ResponseBody
	@GetMapping("/cours/getUser")
	public ResponseEntity<List<CoursAvecInfoMoniteur>> recupCoursUtilisateurs(@Validated @RequestParam  int id_user){

		List<Cours> listCoursBDD= new ArrayList<>();
		List<JSONObject> listCoursBDDString = combinaisonRepository.getCoursUserById((long) id_user);

		for(JSONObject coursString : listCoursBDDString){

			Cours coursBDD =new Cours((Date) coursString.get("date_debut"),(Date) coursString.get("date_fin"), coursString.getAsNumber("max_cavalier").intValue(), coursString.getAsNumber("niveau").intValue(),coursString.getAsString("titre"),(boolean) coursString.get("recurrent"), coursString.getAsNumber("moniteur").longValue(), coursString.getAsNumber("état").intValue());

			coursBDD.setId(coursString.getAsNumber("id_cours").longValue());
			listCoursBDD.add(coursBDD);
		}

		List<CoursAvecInfoMoniteur> allCoursInfo= new ArrayList<>();
		for (Cours cours : listCoursBDD){
			String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
			String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

			CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(), cours.getIdMoniteur(), cours.getDateDebut().toString(),cours.getDateFin().toString(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),prenomMoniteur,nomMoniteur,cours.getEtat());
			allCoursInfo.add(coursinfo);
		}

		return new ResponseEntity<>(allCoursInfo,HttpStatus.OK);

	}

	@ResponseBody
	@GetMapping("/cours/addCoursToUser")
	public ResponseEntity<CoursAvecInfoMoniteur> addCoursToUtilisateurs(@Validated @RequestParam long iduser, @RequestParam long idCours
	){



		Combinaison combinaison = new Combinaison(iduser,(long)-1,idCours);

		combinaisonRepository.save(combinaison);
		Cours cours =coursRepository.findCoursByIdCours(idCours);

		String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
		String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

		CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(), cours.getIdMoniteur(), cours.getDateDebut().toString(),cours.getDateFin().toString(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),prenomMoniteur,nomMoniteur,cours.getEtat());


		return new ResponseEntity<>(coursinfo,HttpStatus.CREATED);

	}

/*	@ResponseBody
	@GetMapping("/test")
	public ResponseEntity<Combinaison> addCoursToUtilisateurstest(){
		//Long id_user= (Long) body.getAsNumber("iduser");
		//Long id_cours= (Long) body.getAsNumber("idCours");
		Cheval chevalRequest = new Cheval();
		//chevalRequest.setId((long) -1);Equitation@localhost
		chevalRepository.save(chevalRequest);


		Cours coursRequest = new Cours(null,null,4,2,"aa",false, (long) 3,0);

		coursRepository.save(coursRequest);

		Combinaison combinaison = new Combinaison((long)3,(long)1,coursRepository.findLastIdCours());

		combinaisonRepository.save(combinaison);
		return new ResponseEntity<>(combinaisonRepository.findCombinaisonByIdCombinaison(1),HttpStatus.CREATED);

	}*/


	@ResponseBody
	@GetMapping("/cours/getMoniteur")
	public ResponseEntity<List<JSONObject>> getCoursMoniteur(@Validated @RequestParam long id_moniteur) {  //pb format date

	//int id_user= (int) body.getAsNumber("id_moniteur");
		List<Cours> coursMoniteurBDD = coursRepository.findCoursByIdMoniteur(id_moniteur);
		List<JSONObject> coursMoniteurBDDJSON = new ArrayList<>();
		for (Cours coursBDD : coursMoniteurBDD){

			JSONObject objetRetour = new JSONObject();
			objetRetour.put("id_cours",coursBDD.getId());
			objetRetour.put("max_cavalier",coursBDD.getMax_cavalier());
			objetRetour.put("niveau",coursBDD.getNiveau());
			objetRetour.put("etat",coursBDD.getEtat());
			objetRetour.put("dateDebut",coursBDD.getDateDebut());
			objetRetour.put("dateFin",coursBDD.getDateFin());
			objetRetour.put("idMoniteur",coursBDD.getIdMoniteur());
			objetRetour.put("recurrent",coursBDD.getRecurrent());
			objetRetour.put("titre",coursBDD.getTitre());
			objetRetour.put("id_cours",coursBDD.getId());
			coursMoniteurBDDJSON.add(objetRetour);
		}

		return new ResponseEntity<>(coursMoniteurBDDJSON, HttpStatus.OK);
	}


	@ResponseBody
	@PostMapping("/cours/newCours")
	public ResponseEntity<JSONObject> newCours (@Validated @RequestBody JSONObject body) throws ParseException {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		int max_cavalier = body.getAsNumber("max_cavalier").intValue();
		int niveau =  body.getAsNumber("niveau").intValue();
		int etat = body.getAsNumber("etat").intValue();
		Date date_debut=format.parse(body.getAsString("date_debut"));
		Date date_fin=format.parse(body.getAsString("date_fin"));
		Long idMoniteur =  body.getAsNumber("idMoniteur").longValue();
		Boolean recurrent= (boolean) body.get("recurrent");
		String titre=body.getAsString("titre");


		Cours coursRequest = new Cours(date_debut,date_fin,max_cavalier,niveau,titre,recurrent,idMoniteur,etat);
		coursRepository.save(coursRequest);

		Cours coursBDD = coursRepository.findCoursByIdCours(coursRepository.findLastIdCours());

		String nomMoniteur = utilisateurRepository.getNomById(coursBDD.getIdMoniteur());
		String prenomMoniteur = utilisateurRepository.getPrenomById(coursBDD.getIdMoniteur());

		JSONObject objetRetour = new JSONObject();
		objetRetour.put("max_cavalier",coursBDD.getMax_cavalier());
		objetRetour.put("niveau",coursBDD.getNiveau());
		objetRetour.put("etat",coursBDD.getEtat());
		objetRetour.put("dateDebut",coursBDD.getDateDebut());
		objetRetour.put("dateFin",coursBDD.getDateFin());
		objetRetour.put("idMoniteur",coursBDD.getIdMoniteur());
		objetRetour.put("recurrent",coursBDD.getRecurrent());
		objetRetour.put("titre",coursBDD.getTitre());
		objetRetour.put("nomMoniteur",nomMoniteur);
		objetRetour.put("prenomMoniteur",prenomMoniteur);
		objetRetour.put("id_cours",coursBDD.getId());



		return new ResponseEntity<>(objetRetour, HttpStatus.CREATED);

	}

	/*@ResponseBody
	@GetMapping("/cours/newCourstest")
	public ResponseEntity<JSONObject> newCours (//@Validated @RequestBody Cours cours
										   ) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Date dateDebut=format.parse("2020-11-12 22:09:00");
		System.out.println(dateDebut);
		Cours coursRequest = new Cours(dateDebut,dateDebut,5,6,"test",false,(long)8,0);
		coursRepository.save(coursRequest);

		//Cours coursBDD= coursRepository.findCoursByDateAndMaxcavalierAndNiveauAndTitreAndRecurrentAndIdMoniteurAndEtat(cours.getDate(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),cours.getIdMoniteur(),cours.getEtat());
		//Cours coursBDD = coursRepository.findCoursByIdCours(coursRepository.findLastIdCours());

		//System.out.println(coursRepository.getCoursById((long) 5).get("date_debut"));

		Cours coursBDD = coursRepository.findCoursByIdCours(5);

		JSONObject objetRetour = new JSONObject();
		objetRetour.put("max_cavalier",coursBDD.getMax_cavalier());
		objetRetour.put("niveau",coursBDD.getNiveau());
		objetRetour.put("etat",coursBDD.getEtat());
		objetRetour.put("date_debut",coursBDD.getDateDebut().toString());
		objetRetour.put("date_fin",coursBDD.getDateFin().toString());
		objetRetour.put("idMoniteur",coursBDD.getIdMoniteur());
		objetRetour.put("recurrent",coursBDD.getRecurrent());
		objetRetour.put("titre",coursBDD.getTitre());


		return new ResponseEntity<>(objetRetour, HttpStatus.CREATED);

	}*/

	@ResponseBody
	@GetMapping("/cours/combiOfCours")
	public ResponseEntity<List<JSONObject>> combiOfCours (@Validated @RequestParam int id_cours
	){

		List<Combinaison> combinaisonListBDD = combinaisonRepository.findCombinaisonByIdCours(id_cours);


		List<JSONObject> retourCombinaison = new ArrayList<>();
			for(Combinaison combinaisonBDD : combinaisonListBDD){

				JSONObject objetRetour = new JSONObject();
				Cheval chevalBDD = chevalRepository.findChevalByIdCheval(combinaisonBDD.getIdCheval());
				Utilisateur utilisateurBDD=utilisateurRepository.findUtilisateurByIdUtilisateur(combinaisonBDD.getIdUtilisateur());
				UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());

				objetRetour.put("cheval",chevalBDD);
				objetRetour.put("utilisateur",utilisateurSimpleBDD);
				objetRetour.put("id_combi",combinaisonBDD.getId());
				objetRetour.put("id_cours",combinaisonBDD.getIdCours());

				retourCombinaison.add(objetRetour);
			}

			return new ResponseEntity<>(retourCombinaison,HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping({"/admin/getUserbyId", "/user/getUser","/moniteur/getUser"})
	public ResponseEntity<Utilisateur> getUserByID(@Validated @RequestParam long id_user ){
		//Long id_user = (Long) body.getAsNumber("id_user");
		Utilisateur utilisateurBDD = utilisateurRepository.findUtilisateurByIdUtilisateur(id_user);
		return new ResponseEntity<>(utilisateurBDD,HttpStatus.OK);

	}


	@ResponseBody
	@GetMapping("/admin/getAllUser")
	public ResponseEntity<List<UtilisateurSimple>> getAllUsersimple (){
		List<Utilisateur> utilisateurListBDD = utilisateurRepository.findUtilisateurByRole(0);
		List<UtilisateurSimple> utilisateurSimpleListBDD = convertUserInUserSimple(utilisateurListBDD);

		return new ResponseEntity<>(utilisateurSimpleListBDD,HttpStatus.OK);
	}


	@ResponseBody
	@GetMapping("/admin/getAllMoniteur")
	public ResponseEntity<List<UtilisateurSimple>> getAllMoniteursimple (){
		List<Utilisateur> utilisateurListBDD = utilisateurRepository.findUtilisateurByRole(1);
		List<UtilisateurSimple> utilisateurSimpleListBDD = convertUserInUserSimple(utilisateurListBDD);

		return new ResponseEntity<>(utilisateurSimpleListBDD,HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping("/admin/getAllAdmin")
	public ResponseEntity<List<UtilisateurSimple>> getAllAdminsimple (){
		List<Utilisateur> utilisateurListBDD = utilisateurRepository.findUtilisateurByRole(2);
		List<UtilisateurSimple> utilisateurSimpleListBDD = convertUserInUserSimple(utilisateurListBDD);

		return new ResponseEntity<>(utilisateurSimpleListBDD,HttpStatus.OK);
	}
	@ResponseBody
	@PostMapping("/cheval/add")
	public ResponseEntity<Cheval> newCheval (@Validated @RequestBody Cheval cheval){
		Cheval chevalRequest = new Cheval(cheval.getNom(),cheval.getAge(),cheval.getSexe(),cheval.getTaille(),cheval.getCouleur(), cheval.getRace());
		chevalRepository.save(chevalRequest);

		Cheval chevalBDD= chevalRepository.findChevalByIdCheval(chevalRepository.findLastIdCheval());
		return new ResponseEntity<>(chevalBDD, HttpStatus.CREATED);

	}

	@ResponseBody
	@GetMapping("/cheval/all")
	public ResponseEntity<List<Cheval>> getAllCheval() {

		List<Cheval> allCheval = chevalRepository.findAll();
		return new ResponseEntity<>(allCheval, HttpStatus.OK);
	}

	@ResponseBody
	@PostMapping("/cheval/attr")
	public ResponseEntity<List<JSONObject>> attCheval (@Validated @RequestBody JSONObject body){
		Long id_cours = body.getAsNumber("id_cours").longValue();
		Long id_combi = body.getAsNumber("combi").longValue();
		Long id_cheval = body.getAsNumber("cheval").longValue();

		Combinaison combinaisonBDDAppel =combinaisonRepository.findCombinaisonByIdCombinaison(id_combi);
		combinaisonBDDAppel.setIdCheval(id_cheval);
		combinaisonRepository.save(combinaisonBDDAppel);

		List<Combinaison> combinaisonListBDD = combinaisonRepository.findCombinaisonByIdCours(id_cours);


		List<JSONObject> retourCombinaison = new ArrayList<>();
		for(Combinaison combinaisonBDD : combinaisonListBDD){

			JSONObject objetRetour = new JSONObject();
			Cheval chevalBDD = chevalRepository.findChevalByIdCheval(combinaisonBDD.getIdCheval());
			Utilisateur utilisateurBDD=utilisateurRepository.findUtilisateurByIdUtilisateur(combinaisonBDD.getIdUtilisateur());
			UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());

			objetRetour.put("cheval",chevalBDD);
			objetRetour.put("utilisateur",utilisateurSimpleBDD);
			objetRetour.put("id_combi",combinaisonBDD.getId());
			objetRetour.put("id_cours",combinaisonBDD.getIdCours());

			retourCombinaison.add(objetRetour);
		}
		return new ResponseEntity<>(retourCombinaison, HttpStatus.CREATED);

	}
	@ResponseBody
	@GetMapping("/cours/detailCours")
	public ResponseEntity<Cheval> chevalAssocié (@Validated @RequestParam long id_user, @RequestParam long id_cours	){

		Cheval chevalBDD = new Cheval();



		Combinaison combinaisonBDD =combinaisonRepository.findCombinaisonByIdCoursAndIdUtilisateur(id_cours,id_user);
		if(combinaisonBDD.getIdCheval()==-1){
			chevalBDD.setNom(null);
		}
		else{
			 chevalBDD = chevalRepository.findChevalByIdCheval(combinaisonBDD.getIdCheval());
		}

		return new ResponseEntity<>(chevalBDD, HttpStatus.CREATED);

	}

	@ResponseBody
	@GetMapping("/cheval/dispo")
	public ResponseEntity<List<Cheval>> dispoCheval(@Validated @RequestParam long id_cours ){
			Cours coursBDD = coursRepository.findCoursByIdCours(id_cours);

			Date dateDebut = coursBDD.getDateDebut();
			Date dateFin = coursBDD.getDateFin();

			List<Cours> coursBeforeAfter = coursRepository.findAllByDateDebutBeforeAndDateFinAfter(dateDebut,dateFin);
			List<Cours> coursBeforeBefore =coursRepository.findAllByDateDebutBeforeAndDateFinBefore(dateDebut,dateFin);
			List<Cours> coursAfterAfter =coursRepository.findAllByDateDebutAfterAndDateFinAfter(dateDebut,dateFin);
			List<Cours> coursAfterBefore =coursRepository.findAllByDateDebutAfterAndDateFinBefore(dateDebut,dateFin);

			List<Cours> allCoursConflit= new ArrayList<>();

			allCoursConflit.addAll(coursAfterAfter);
			allCoursConflit.addAll(coursAfterBefore);
			allCoursConflit.addAll(coursBeforeAfter);
			allCoursConflit.addAll(coursBeforeBefore);

			List<List<Combinaison>> allCombinaisonConflit =new ArrayList<>();

			for(Cours coursConflit : allCoursConflit){
				List<Combinaison> combinaison= combinaisonRepository.findCombinaisonByIdCours(coursConflit.getId());
				allCombinaisonConflit.add(combinaison);
			}

			List<Cheval> chevalListBDD=chevalRepository.findAll();
			List<Cheval> chevalListRetour= new ArrayList<>();

			for (Cheval cheval : chevalListBDD){
				int compt=0;
				for (List<Combinaison> i : allCombinaisonConflit){
					for (Combinaison j : i){
						if (cheval.getId()==j.getIdCheval()){
							compt++;

						}
					}
				}
				if(compt==0) {
					chevalListRetour.add(cheval);
				}

			}

			return new ResponseEntity<>(chevalListRetour,HttpStatus.OK);


	}




}
