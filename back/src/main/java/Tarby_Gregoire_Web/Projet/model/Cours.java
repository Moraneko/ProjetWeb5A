package Tarby_Gregoire_Web.Projet.model;

import java.text.DateFormat;
import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "cours")
public class Cours{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCours;

	//@Column(name="date", nullable = false)

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_debut")
	private Date dateDebut;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_fin")
	private Date dateFin;

	@Column(name="max_cavalier", nullable = false)
	private int maxcavalier;

	@Column(name="niveau", nullable = false)
	private int niveau;

	@Column(name="titre")
	private String titre;

	@Column(name="recurrent", nullable = false)
	private Boolean recurrent;

	@Column (name="moniteur",nullable = false)
	private Long idMoniteur;

	@Column (name = "état", nullable = false)
	private int etat;  // 0: cours, 1: fini, 2: annulé

	public Cours() {

	}

	public Cours(Date dateDebut, Date dateFin, int max_cavalier, int niveau, String titre, Boolean recurrent, Long idMoniteur, int etat) {

		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.maxcavalier = max_cavalier;
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


	public Date getDateDebut() {
		return dateDebut;
	}

	public void setDate(Date dateDebut) {
		this.dateDebut = dateDebut;
	}


	public int getMax_cavalier() {
		return maxcavalier;
	}

	public void setMax_cavalier(int max_cavalier) {
		this.maxcavalier = max_cavalier;
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

	public Long getIdMoniteur() {
		return idMoniteur;
	}

	public void setIdMoniteur(Long idMoniteur) {
		this.idMoniteur = idMoniteur;
	}

	public int getEtat() {
		return etat;
	}

	public void setEtat(int etat) {
		this.etat = etat;
	}

	public Date getDateFin() {
		return dateFin;
	}

	public void setDateFin(Date dateFin) {
		this.dateFin = dateFin;
	}
}
