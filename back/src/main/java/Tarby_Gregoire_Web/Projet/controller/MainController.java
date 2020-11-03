package Tarby_Gregoire_Web.Projet.controller;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import Tarby_Gregoire_Web.Projet.model.Utilisateur;
import Tarby_Gregoire_Web.Projet.repository.ChevalRepository;
import Tarby_Gregoire_Web.Projet.repository.CoursRepository;
import Tarby_Gregoire_Web.Projet.repository.UtilisateurRepository;

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

	@ResponseBody
	@GetMapping("/connection")
	public ResponseEntity<String> test(){
		return new ResponseEntity<>("Hello World", HttpStatus.OK);
	}

	@ResponseBody
	@PostMapping("/formulaire")
	public ResponseEntity<Utilisateur> createUtilisateur(@Validated @RequestBody Utilisateur utilisateur){
		if(utilisateurRepository.findByEmail(utilisateur.getEmail())!= null){
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}
	/*	String encoded = new BCryptPasswordEncoder().encode(utilisateur.getMdp());
		System.out.println(encoded);

		if(encoded==utilisateur.getMdp()){
			System.out.println("vrai");
		}
		else {
			System.out.println("faux");
		} */

		Utilisateur utilisateurRequest = new Utilisateur(utilisateur.getPrenom(), utilisateur.getNom(), utilisateur.getEmail(), utilisateur.getTelephone(), utilisateur.getLicence(), passwordEncoder.encode(utilisateur.getMdp()), utilisateur.getRole());
		utilisateurRepository.save(utilisateurRequest);

		//Utilisateur utilisateurBDD= utilisateurRepository.findByEmail(utilisateur.getEmail());

		return new ResponseEntity<>(HttpStatus.CREATED); //201
	}


}
