package Tarby_Gregoire_Web.Projet.model;

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
}
