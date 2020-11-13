package Tarby_Gregoire_Web.Projet.repository;

import java.text.DateFormat;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Tarby_Gregoire_Web.Projet.model.Cours;
import net.minidev.json.JSONObject;


public interface CoursRepository extends JpaRepository<Cours, Long> {

	public Cours findCoursByIdCours(long id_cours);

	public List<Cours> findAllByDateDebutAfter(DateFormat date);

	public List<Cours> findCoursByIdMoniteur(long idMoniteur);

	//public Cours findCoursByDateAndAndMaxcavalierAndNiveauAndTitreAndRecurrentAndIdMoniteurAndEtat(DateFormat date, int max_cavalier, int niveau, String titre, Boolean recurrent, int idMoniteur, int etat);
	@Query(value = "SELECT id_cours, date_debut, date_fin, max_cavalier, moniteur, niveau, recurrent, titre, état from Cours  WHERE id_cours=:requestID ", nativeQuery = true)
	JSONObject getCoursById(@Param("requestID") Long requestID);

	@Query("SELECT max(idCours) FROM Cours ")
	Long findLastIdCours();


}
