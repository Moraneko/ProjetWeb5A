package Tarby_Gregoire_Web.Projet.model;

import java.text.DateFormat;


public class CoursAvecInfoMoniteur {


	private Long idCours;

	private Long idMoniteur;

	private String dateDebut;

	private String dateFin;

	private int maxcavalier;

	private int niveau;

	private String titre;

	private Boolean recurrent;

	private String PrenomMoniteur;

	private String NomMoniteur;

	private int etat;  // 0: cours, 1: fini, 2: annulé

	public CoursAvecInfoMoniteur(Long idCours, Long idMoniteur, String dateDebut, String dateFin, int maxcavalier, int niveau, String titre, Boolean recurrent, String prenomMoniteur, String nomMoniteur, int etat) {
		this.idCours = idCours;
		this.idMoniteur = idMoniteur;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.maxcavalier = maxcavalier;
		this.niveau = niveau;
		this.titre = titre;
		this.recurrent = recurrent;
		PrenomMoniteur = prenomMoniteur;
		NomMoniteur = nomMoniteur;
		this.etat = etat;
	}

	public Long getIdCours() {
		return idCours;
	}

	public void setIdCours(Long idCours) {
		this.idCours = idCours;
	}

	public String getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(String dateDebut) {
		this.dateDebut = dateDebut;
	}

	public String getDateFin() {
		return dateFin;
	}

	public void setDateFin(String dateFin) {
		this.dateFin = dateFin;
	}

	public int getMaxcavalier() {
		return maxcavalier;
	}

	public void setMaxcavalier(int maxcavalier) {
		this.maxcavalier = maxcavalier;
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

	public String getPrenomMoniteur() {
		return PrenomMoniteur;
	}

	public void setPrenomMoniteur(String prenomMoniteur) {
		PrenomMoniteur = prenomMoniteur;
	}

	public String getNomMoniteur() {
		return NomMoniteur;
	}

	public void setNomMoniteur(String nomMoniteur) {
		NomMoniteur = nomMoniteur;
	}

	public int getEtat() {
		return etat;
	}

	public void setEtat(int etat) {
		this.etat = etat;
	}

	public Long getIdMoniteur() {
		return idMoniteur;
	}

	public void setIdMoniteur(Long idMoniteur) {
		this.idMoniteur = idMoniteur;
	}
}
