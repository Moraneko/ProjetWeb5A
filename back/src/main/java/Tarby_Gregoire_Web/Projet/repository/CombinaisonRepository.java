package Tarby_Gregoire_Web.Projet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Tarby_Gregoire_Web.Projet.model.Combinaison;
import Tarby_Gregoire_Web.Projet.model.Cours;
import net.minidev.json.JSONObject;

public interface CombinaisonRepository extends JpaRepository<Combinaison, Long> {

	public Combinaison findCombinaisonByIdCombinaison(long id);
	public List<Combinaison> findCombinaisonByIdCours(long id);

	@Query(value = "SELECT c.id_cours, c.date_debut, c.date_fin, c.max_cavalier, c.moniteur, c.niveau, c.recurrent, c.titre, c.état from Cours c inner join Combinaison b ON c.id_Cours = b.id_Cours WHERE b.id_Utilisateur=:requestID ", nativeQuery = true)
	List<JSONObject> getCoursUserById(@Param("requestID") Long requestID);






}
