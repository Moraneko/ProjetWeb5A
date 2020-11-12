package Tarby_Gregoire_Web.Projet.repository;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import Tarby_Gregoire_Web.Projet.model.Cours;


public interface CoursRepository extends JpaRepository<Cours, Long> {

	public Cours findCoursByIdCours(long id_cours);

	public List<Cours> findAllByDateDebutAfter(Date date);

	public List<Cours> findCoursByIdMoniteur(long idMoniteur);

	//public Cours findCoursByDateAndAndMaxcavalierAndNiveauAndTitreAndRecurrentAndIdMoniteurAndEtat(Date date, int max_cavalier, int niveau, String titre, Boolean recurrent, int idMoniteur, int etat);
	@Query("SELECT max(idCours) FROM Cours ")
	Long findLastIdCours();


}
