package Tarby_Gregoire_Web.Projet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tarby_Gregoire_Web.Projet.model.Cheval;


public interface ChevalRepository extends JpaRepository<Cheval, Long> {

	public Cheval findChevalByIdCheval(long id_cheval);
	public Cheval findChevalByNom(String nom);
}
