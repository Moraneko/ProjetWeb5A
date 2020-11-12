package Tarby_Gregoire_Web.Projet.controller;


import java.math.BigInteger;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


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
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ChevalRepository chevalRepository;
	@Autowired
	private CoursRepository coursRepository;

	@Autowired
	private CombinaisonRepository combinaisonRepository;

	@ResponseBody
	@PostMapping("/connectionApi")
	public ResponseEntity<String> Login(@Validated @RequestBody JSONObject body) {

		String identifiant = body.getAsString("identifiant"); //email ou num tel
		String mdp = body.getAsString("mdp");

		if (utilisateurRepository.getIdUtilisateurbyEmailOrTel(identifiant) == null) {
			return new ResponseEntity<>("Il n'existe aucun utilisateur avec ces identifiants", HttpStatus.NOT_FOUND); //404
		}

		String mdpBDD = utilisateurRepository.getMDP(identifiant);
		if (passwordEncoder.matches(mdp, mdpBDD) == false) {
			System.out.println("pas de correspondance");
		} else {
			System.out.println("ok");
		}

		return new ResponseEntity<>(HttpStatus.OK); //200
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
	public ResponseEntity<Utilisateur> updateUtilisateur(@Validated @RequestBody Utilisateur utilisateur) { //demander à Moran si il renvoie bien tous l'utilisateur

		Utilisateur utilisateurBDD = utilisateurRepository.findUtilisateurByIdUtilisateur(utilisateur.getId());

		if (utilisateurRepository.findUtilisateurByEmail(utilisateur.getEmail()) == null || utilisateur.getEmail()==utilisateurBDD.getEmail()) {
			utilisateurBDD.setEmail(utilisateur.getEmail());
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}

		if (utilisateurRepository.findUtilisateurByTelephone(utilisateur.getTelephone()) == null || utilisateur.getTelephone()==utilisateurBDD.getTelephone()) {
			utilisateurBDD.setTelephone(utilisateur.getTelephone());
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}
		utilisateurBDD.setLicence(utilisateur.getLicence());

		utilisateurRepository.save(utilisateurBDD);

		return new ResponseEntity<>(utilisateurRepository.findUtilisateurByIdUtilisateur(utilisateur.getId()), HttpStatus.ACCEPTED);


	}

	@ResponseBody
	@GetMapping("/cours/getAllCours")
	public ResponseEntity<List<CoursAvecInfoMoniteur>> getAllCours() {  //pb format date

		List<Cours> allCours = coursRepository.findAll();
		List<CoursAvecInfoMoniteur> allCoursInfo= new ArrayList<>();
		for (Cours cours : allCours){
			String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
			String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

			CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(),cours.getDateDebut(),cours.getDateFin(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),prenomMoniteur,nomMoniteur,cours.getEtat());
			allCoursInfo.add(coursinfo);
		}
		return new ResponseEntity<>(allCoursInfo, HttpStatus.OK);
	}



	@ResponseBody
	@GetMapping("/cours/getUser")
	public ResponseEntity<List<CoursAvecInfoMoniteur>> recupCoursUtilisateurs(@Validated @RequestParam  int id_user){
		//Long id_user= (Long) body.getAsNumber("id_user");
		List<JSONObject> listCoursBDDString = combinaisonRepository.getCoursUserById((long) id_user);
		List<Cours> listCoursBDD= new ArrayList<>();
		for(JSONObject coursString : listCoursBDDString){
			Cours coursBDD =new Cours((DateFormat) coursString.get("date_debut"),(DateFormat) coursString.get("date_fin"),(int) coursString.getAsNumber("max_cavalier"),(int) coursString.getAsNumber("niveau"),coursString.getAsString("titre"),(boolean) coursString.get("recurrent"), coursString.getAsNumber("moniteur").longValue(),(int) coursString.getAsNumber("état"));
			coursBDD.setId(coursString.getAsNumber("id_cours").longValue());
			listCoursBDD.add(coursBDD);
		}
		List<CoursAvecInfoMoniteur> allCoursInfo= new ArrayList<>();
		for (Cours cours : listCoursBDD){
			String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
			String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

			CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(),cours.getDateDebut(),cours.getDateFin(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),prenomMoniteur,nomMoniteur,cours.getEtat());
			allCoursInfo.add(coursinfo);
		}

		return new ResponseEntity<>(allCoursInfo,HttpStatus.OK);

	}

	@ResponseBody
	@GetMapping("/cours/addCoursToUser")
	public ResponseEntity<CoursAvecInfoMoniteur> addCoursToUtilisateurs(@Validated @RequestParam long iduser, @RequestParam long idCours){
		//Long id_user= (Long) body.getAsNumber("iduser");
		//Long id_cours= (Long) body.getAsNumber("idCours");

		Combinaison combinaison = new Combinaison(iduser,(long)-1,idCours);
		combinaisonRepository.save(combinaison);
		Cours cours =coursRepository.findCoursByIdCours(idCours);

		String nomMoniteur = utilisateurRepository.getNomById(cours.getIdMoniteur());
		String prenomMoniteur = utilisateurRepository.getPrenomById(cours.getIdMoniteur());

		CoursAvecInfoMoniteur coursinfo = new CoursAvecInfoMoniteur(cours.getId(),cours.getDateDebut(),cours.getDateFin(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),prenomMoniteur,nomMoniteur,cours.getEtat());


		return new ResponseEntity<>(coursinfo,HttpStatus.CREATED);

	}

/*	@ResponseBody
	@GetMapping("/test")
	public ResponseEntity<Combinaison> addCoursToUtilisateurstest(){
		//Long id_user= (Long) body.getAsNumber("iduser");
		//Long id_cours= (Long) body.getAsNumber("idCours");
		Cheval chevalRequest = new Cheval();
		//chevalRequest.setId((long) -1);
		chevalRepository.save(chevalRequest);


		Cours coursRequest = new Cours(null,null,4,2,"aa",false, (long) 3,0);

		coursRepository.save(coursRequest);

		Combinaison combinaison = new Combinaison((long)3,(long)1,coursRepository.findLastIdCours());

		combinaisonRepository.save(combinaison);
		return new ResponseEntity<>(combinaisonRepository.findCombinaisonByIdCombinaison(1),HttpStatus.CREATED);

	}*/


	@ResponseBody
	@GetMapping("/cours/getMoniteur")
	public ResponseEntity<List<Cours>> getCoursMoniteur(@Validated @RequestParam long id_moniteur) {  //pb format date

	//int id_user= (int) body.getAsNumber("id_moniteur");
		List<Cours> coursMoniteurBDD = coursRepository.findCoursByIdMoniteur(id_moniteur);

		return new ResponseEntity<>(coursMoniteurBDD, HttpStatus.OK);
	}


	@ResponseBody
	@PostMapping("/cours/newCours")
	public ResponseEntity<Cours> newCours (@Validated @RequestBody Cours cours){
		Cours coursRequest = new Cours(cours.getDateDebut(),cours.getDateFin(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),cours.getIdMoniteur(),cours.getEtat());
		coursRepository.save(coursRequest);

		//Cours coursBDD= coursRepository.findCoursByDateAndAndMaxcavalierAndNiveauAndTitreAndRecurrentAndIdMoniteurAndEtat(cours.getDate(),cours.getMax_cavalier(),cours.getNiveau(),cours.getTitre(),cours.getRecurrent(),cours.getIdMoniteur(),cours.getEtat());
		Cours coursBDD = coursRepository.findCoursByIdCours(coursRepository.findLastIdCours());
		return new ResponseEntity<>(coursBDD, HttpStatus.CREATED);

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
		List<UtilisateurSimple> utilisateurSimpleListBDD = new ArrayList<>();
		for(Utilisateur utilisateurBDD : utilisateurListBDD ){
			UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());
			utilisateurSimpleListBDD.add(utilisateurSimpleBDD);
		}
		return new ResponseEntity<>(utilisateurSimpleListBDD,HttpStatus.OK);
	}


	@ResponseBody
	@GetMapping("/admin/getAllMoniteur")
	public ResponseEntity<List<UtilisateurSimple>> getAllMoniteursimple (){
		List<Utilisateur> utilisateurListBDD = utilisateurRepository.findUtilisateurByRole(1);
		List<UtilisateurSimple> utilisateurSimpleListBDD = new ArrayList<>();
		for(Utilisateur utilisateurBDD : utilisateurListBDD ){
			UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());
			utilisateurSimpleListBDD.add(utilisateurSimpleBDD);
		}
		return new ResponseEntity<>(utilisateurSimpleListBDD,HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping("/admin/getAllAdmin")
	public ResponseEntity<List<UtilisateurSimple>> getAllAdminsimple (){
		List<Utilisateur> utilisateurListBDD = utilisateurRepository.findUtilisateurByRole(2);
		List<UtilisateurSimple> utilisateurSimpleListBDD = new ArrayList<>();
		for(Utilisateur utilisateurBDD : utilisateurListBDD ){
			UtilisateurSimple utilisateurSimpleBDD = new UtilisateurSimple(utilisateurBDD.getId(), utilisateurBDD.getPrenom(), utilisateurBDD.getNom(),utilisateurBDD.getRole());
			utilisateurSimpleListBDD.add(utilisateurSimpleBDD);
		}
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

}
