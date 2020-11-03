package Tarby_Gregoire_Web.Projet.model;

import javax.persistence.*;

@Entity
@Table(name="chevaux")
public class Cheval {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idCheval;

	@Column(name="nom", nullable = false)
	private String nom;

	@Column(name="age", nullable = false)
	private int age;

	@Column(name="sexe", nullable = false)
	private String sexe;

	@Column(name="taille", nullable = false)
	private int taille;

	@Column(name="couleur", nullable = false)
	private String couleur;

	public Cheval() {

	}


	public Cheval(String nom, int age, String sexe, int taille, String couleur) {
		this.nom = nom;
		this.age = age;
		this.sexe = sexe;
		this.taille = taille;
		this.couleur = couleur;
	}


	public Long getId() {
		return idCheval;
	}

	public void setId(Long id) {
		this.idCheval = id;
	}


	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}


	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}


	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}


	public int getTaille() {
		return taille;
	}

	public void setTaille(int taille) {
		this.taille = taille;
	}


	public String getCouleur() {
		return couleur;
	}

	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}
}
