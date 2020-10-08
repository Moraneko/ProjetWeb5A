package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name= "utilisateurs")
public class Utilisateur {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id_user;

	@Column(name="prenom", nullable = false)
	private String prenom;

	@Column(name="nom", nullable = false)
	private String nom;

	@Column(name="email", nullable = false)
	private String email;

	@Column(name="tel", nullable = false)
	private String tel;

	@Column(name="licence")
	private String licence;

	@Column(name="mdp", nullable = false)
	private String mdp;

	@Column(name="role", nullable = false)
	private int role;

	public Utilisateur() {

	}
	public Utilisateur(String prenom, String nom, String email, String tel, String licence, String mdp, int role) {
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.tel = tel;
		this.licence = licence;
		this.mdp = mdp;
		this.role = role;
	}


	public Long getId() {
		return id_user;
	}

	public void setId(Long id) {
		this.id_user = id;
	}


	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}


	public String getLicence() {
		return licence;
	}

	public void setLicence(String licence) {
		this.licence = licence;
	}


	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}


	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}
}

