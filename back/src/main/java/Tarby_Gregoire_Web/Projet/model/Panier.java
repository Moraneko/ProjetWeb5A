package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name="panier")
public class Panier {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idPanier;

	@Column(name="idUtilisateur", nullable = false)
	private Long idUtilisateur;

	@Column(name="idCheval", nullable = false)
	private Long idCheval;

	@Column(name="idCours", nullable = false)
	private Long idCours;

	public Panier() {

	}


	public Panier(Long id_user, Long id_cheval,Long id_cours){
		this.idUtilisateur=id_user;
		this.idCheval=id_cheval;
		this.idCours=id_cours;
	}


	public Long getId() {
		return idPanier;
	}

	public void setId(Long id) {
		this.idPanier = id;
	}


	public Long getId_user() {
		return idUtilisateur;
	}

	public void setId_user(Long id_user) {
		this.idUtilisateur = id_user;
	}


	public Long getId_cheval() {
		return idCheval;
	}

	public void setId_cheval(Long id_cheval) {
		this.idCheval = id_cheval;
	}


	public Long getId_cours() {
		return idCours;
	}

	public void setId_cours(Long id_cours) {
		this.idCours = id_cours;
	}
}
