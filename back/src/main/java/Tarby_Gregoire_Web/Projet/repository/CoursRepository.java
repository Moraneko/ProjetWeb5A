package Tarby_Gregoire_Web.Projet.repository;

import java.text.DateFormat;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import Tarby_Gregoire_Web.Projet.model.Cours;

public interface CoursRepository extends CrudRepository<Cours, Long> {

	Cours findCoursById_cours(Long id_cours);
	List<Cours> findAllByDateAfter(DateFormat date);
}
