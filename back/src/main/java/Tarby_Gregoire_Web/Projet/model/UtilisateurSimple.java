package Tarby_Gregoire_Web.Projet.model;

import java.util.ArrayList;
import java.util.List;

public class UtilisateurSimple {


	private Long idUtilisateur;

	private String prenom;

	private String nom;

	private int role;


	public UtilisateurSimple(Long idUtilisateur, String prenom, String nom, int role) {
		this.idUtilisateur = idUtilisateur;
		this.prenom = prenom;
		this.nom = nom;
		this.role = role;
	}

	public Long getIdUtilisateur() {
		return idUtilisateur;
	}

	public void setIdUtilisateur(Long idUtilisateur) {
		this.idUtilisateur = idUtilisateur;
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

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}


}
