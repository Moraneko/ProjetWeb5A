package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name="panier")
public class Panier {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_panier;

	@Column(name="id_user", nullable = false)
	private Long id_user;

	@Column(name="id_cheval", nullable = false)
	private Long id_cheval;

	@Column(name="id_cours", nullable = false)
	private Long id_cours;

	public Panier() {

	}


	public Panier(Long id_user, Long id_cheval,Long id_cours){
		this.id_user=id_user;
		this.id_cheval=id_cheval;
		this.id_cours=id_cours;
	}


	public Long getId() {
		return id_panier;
	}

	public void setId(Long id) {
		this.id_panier = id;
	}


	public Long getId_user() {
		return id_user;
	}

	public void setId_user(Long id_user) {
		this.id_user = id_user;
	}


	public Long getId_cheval() {
		return id_cheval;
	}

	public void setId_cheval(Long id_cheval) {
		this.id_cheval = id_cheval;
	}


	public Long getId_cours() {
		return id_cours;
	}

	public void setId_cours(Long id_cours) {
		this.id_cours = id_cours;
	}
}
