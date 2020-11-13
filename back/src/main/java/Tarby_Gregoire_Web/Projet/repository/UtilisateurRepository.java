package Tarby_Gregoire_Web.Projet.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import Tarby_Gregoire_Web.Projet.model.Utilisateur;
import Tarby_Gregoire_Web.Projet.model.UtilisateurSimple;
import net.minidev.json.JSONObject;


public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {

	public Utilisateur findUtilisateurByIdUtilisateur(long id_user) ; // /admin/getUserById
	public Utilisateur findUtilisateurByEmail(String email);
	public Utilisateur findUtilisateurByTelephone (String Tel);
	public List<Utilisateur> findUtilisateurByRole(int role);

	@Query("SELECT idUtilisateur from Utilisateur where email= :requestID or telephone= :requestID")
	Long getIdUtilisateurbyEmailOrTel(@Param("requestID") String request);

	@Query("SELECT mdp from Utilisateur where (email= :requestID or telephone= :requestID)")
	String getMDP(@Param("requestID") String requestID);

	@Query("SELECT prenom from Utilisateur where idUtilisateur=:requestID")
	String getPrenomById(@Param("requestID") Long requestID);

	@Query("SELECT nom from Utilisateur where idUtilisateur=:requestID")
	String getNomById(@Param("requestID") Long requestID);

}
