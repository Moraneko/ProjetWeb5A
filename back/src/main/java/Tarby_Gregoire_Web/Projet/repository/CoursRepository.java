package Tarby_Gregoire_Web.Projet.repository;

import java.text.DateFormat;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tarby_Gregoire_Web.Projet.model.Cours;


public interface CoursRepository extends JpaRepository<Cours, Long> {

	public Cours findCoursByIdCours(long id_cours);
	public List<Cours> findAllByDateAfter(DateFormat date);
}
