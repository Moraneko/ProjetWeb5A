package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name= "utilisateurs")
public class Utilisateur {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idUtilisateur;

	@Column(name="prenom", nullable = false)
	private String prenom;

	@Column(name="nom", nullable = false)
	private String nom;

	@Column(name="email", nullable = false)
	private String email;

	@Column(name="telephone", nullable = false)
	private String telephone;

	@Column(name="licence")
	private String licence;

	@Column(name="mdp", nullable = false)
	private String mdp;

	@Column(name="role", nullable = false)
	private int role;  //0: user 1: moniteur, 2:admin

	public Utilisateur() {

	}
	public Utilisateur(String prenom, String nom, String email, String telephone, String licence, String mdp, int role) {
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.telephone = telephone;
		this.licence = licence;
		this.mdp = mdp;
		this.role = role;
	}


	public Long getId() {
		return idUtilisateur;
	}

	public void setId(Long id) {
		this.idUtilisateur = id;
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


	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
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

