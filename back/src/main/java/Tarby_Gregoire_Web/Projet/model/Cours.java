package Tarby_Gregoire_Web.Projet.model;

import java.text.DateFormat;

import javax.persistence.*;

@Entity
@Table(name = "cours")
public class Cours {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idCours;

	@Column(name="date", nullable = false)
	private DateFormat date;

	@Column(name="max_cavalier", nullable = false)
	private int max_cavalier;

	@Column(name="niveau", nullable = false)
	private int niveau;

	@Column(name="titre")
	private String titre;

	@Column(name="recurrent", nullable = false)
	private Boolean recurrent;

	@Column (name="moniteur",nullable = false)
	private int idMoniteur;

	@Column (name = "état", nullable = false)
	private int etat;  // 0: cours, 1: fini, 2: annulé

	public Cours() {

	}

	public Cours(DateFormat date, int max_cavalier, int niveau, String titre, Boolean recurrent, int idMoniteur, int etat) {

		this.date = date;
		this.max_cavalier = max_cavalier;
		this.niveau = niveau;
		this.titre = titre;
		this.recurrent = recurrent;
		this.idMoniteur = idMoniteur;
		this.etat = etat;
	}


	public Long getId() {
		return idCours;
	}

	public void setId(Long id) {
		this.idCours = id;
	}


	public DateFormat getDate() {
		return date;
	}

	public void setDate(DateFormat date) {
		this.date = date;
	}


	public int getMax_cavalier() {
		return max_cavalier;
	}

	public void setMax_cavalier(int max_cavalier) {
		this.max_cavalier = max_cavalier;
	}


	public int getNiveau() {
		return niveau;
	}

	public void setNiveau(int niveau) {
		this.niveau = niveau;
	}


	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}


	public Boolean getRecurrent() {
		return recurrent;
	}

	public void setRecurrent(Boolean recurrent) {
		this.recurrent = recurrent;
	}

	public int getIdMoniteur() {
		return idMoniteur;
	}

	public void setIdMoniteur(int idMoniteur) {
		this.idMoniteur = idMoniteur;
	}

	public int getEtat() {
		return etat;
	}

	public void setEtat(int etat) {
		this.etat = etat;
	}
}
