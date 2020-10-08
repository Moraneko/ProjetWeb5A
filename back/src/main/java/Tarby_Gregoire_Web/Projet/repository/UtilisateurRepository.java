package Tarby_Gregoire_Web.Projet.repository;

import org.springframework.data.repository.CrudRepository;

import Tarby_Gregoire_Web.Projet.model.Utilisateur;

public interface UtilisateurRepository extends CrudRepository<Utilisateur,Long> {

	Utilisateur findUtilisateurById_user(Long id_user) ;
	Utilisateur findUtilisateurByEmail(String email);




}
