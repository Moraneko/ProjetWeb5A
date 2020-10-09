package Tarby_Gregoire_Web.Projet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Tarby_Gregoire_Web.Projet.model.Utilisateur;
import Tarby_Gregoire_Web.Projet.repository.ChevalRepository;
import Tarby_Gregoire_Web.Projet.repository.CoursRepository;
import Tarby_Gregoire_Web.Projet.repository.UtilisateurRepository;

@RestController @CrossOrigin(origins = "http://localhost:4200")
public class MainController {

	@Autowired
	private UtilisateurRepository utilisateurRepository;
	private ChevalRepository chevalRepository;
	private CoursRepository coursRepository;

	@PostMapping("/formulaire")
	public ResponseEntity<Utilisateur> createUtilisateur(@Validated @RequestBody Utilisateur utilisateur){

		if(utilisateurRepository.findUtilisateurByEmail(utilisateur.getEmail())!= null){
			return new ResponseEntity<Utilisateur>(HttpStatus.CONFLICT);
		}
		Utilisateur utilisateurRequest = new Utilisateur(utilisateur.getPrenom(), utilisateur.getNom(), utilisateur.getEmail(), utilisateur.getTelephone(), utilisateur.getLicence(), utilisateur.getMdp(), utilisateur.getRole());
		utilisateurRepository.save(utilisateurRequest);

		return new ResponseEntity<Utilisateur>(HttpStatus.CREATED);

	}
}
