package Tarby_Gregoire_Web.Projet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import Tarby_Gregoire_Web.Projet.model.Utilisateur;
import Tarby_Gregoire_Web.Projet.repository.UtilisateurRepository;


@SpringBootApplication
public class ProjetApplication implements ApplicationRunner {

	@Autowired
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;


	public static void main(String[] args) {

		SpringApplication.run(ProjetApplication.class, args);
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}


	@Override
	public void run(ApplicationArguments args) {
		if(utilisateurRepository.findUtilisateurByRole(3).size()==0){
			Utilisateur superAdmin = new Utilisateur("Super", "Admin", "superadmin@root.com", "0102030405", "", passwordEncoder.encode("root"), 3);
			utilisateurRepository.save(superAdmin);
		}

	}
}