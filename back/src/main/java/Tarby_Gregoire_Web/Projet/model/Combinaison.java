package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name = "combinaison")
public class Combinaison {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idCombinaison;


	@Column(name = "idUtilisateur")
	private Long idUtilisateur;

	@Column(name = "idCheval")
	private Long idCheval;

	@Column(name = "idCours")
	private Long idCours;

	public Combinaison() {

	}


	public Combinaison(Long id_user, Long id_cheval, Long id_cours){
		this.idUtilisateur=id_user;
		this.idCheval=id_cheval;
		this.idCours=id_cours;
	}


	public Long getId() {
		return idCombinaison;
	}

	public void setId(Long id) {
		this.idCombinaison = id;
	}


	public Long getIdUtilisateur() {
		return idUtilisateur;
	}

	public void setIdUtilisateur(Long idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
	}

	public Long getIdCheval() {
		return idCheval;
	}

	public void setIdCheval(Long idCheval) {
		this.idCheval = idCheval;
	}

	public Long getIdCours() {
		return idCours;
	}

	public void setIdCours(Long idCours) {
		this.idCours = idCours;
	}
}
