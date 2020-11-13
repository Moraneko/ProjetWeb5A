package Tarby_Gregoire_Web.Projet;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

public class SampleAuthenticationManager implements AuthenticationManager {
	static final List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();

	@Autowired
	private PasswordEncoder passwordEncoder;

	static {
		AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
	}



	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		//System.out.println(auth.getCredentials().toString());
		//System.out.println(auth.getPrincipal().toString());

		//if (passwordEncoder.matches((CharSequence) auth.getPrincipal(),auth.getCredentials().toString())==true) {
			return new UsernamePasswordAuthenticationToken(auth.getName(),
					auth.getCredentials(), AUTHORITIES);
		//}
	//	throw new BadCredentialsException("Bad Credentials");
	}
}