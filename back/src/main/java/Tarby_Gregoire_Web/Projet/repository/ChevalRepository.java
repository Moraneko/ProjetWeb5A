package Tarby_Gregoire_Web.Projet.repository;

import org.springframework.data.repository.CrudRepository;

import Tarby_Gregoire_Web.Projet.model.Cheval;

public interface ChevalRepository extends CrudRepository<Cheval, Long> {

	Cheval findChevalById_cheval(Long id_cheval);
	Cheval findChevalByNom(String nom);
}
