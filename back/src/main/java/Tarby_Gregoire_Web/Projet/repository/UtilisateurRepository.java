package Tarby_Gregoire_Web.Projet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tarby_Gregoire_Web.Projet.model.Utilisateur;


public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {

	public Utilisateur findUtilisateurByIdUtilisateur(long id_user) ;
	public Utilisateur findByEmail(String email);





}
