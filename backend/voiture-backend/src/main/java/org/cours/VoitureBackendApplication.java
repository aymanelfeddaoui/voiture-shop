package org.cours;

import org.cours.modele.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VoitureBackendApplication {

    @Autowired
    private VoitureRepo voitureRepo;

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    public static void main(String[] args) {
        SpringApplication.run(VoitureBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner initData() {
        return args -> {
            if (voitureRepo.count() == 0) {
                Proprietaire p1 = proprietaireRepo.save(
                    new Proprietaire("Ali", "Hassan"));
                Proprietaire p2 = proprietaireRepo.save(
                    new Proprietaire("Najat", "Bani"));

                Voiture v1 = new Voiture(
                    "Toyota","Corolla","Grise","A-1-9090",2018,95000);
                v1.setProprietaire(p1);
                voitureRepo.save(v1);

                Voiture v2 = new Voiture(
                    "Ford","Fiesta","Rouge","A-2-8090",2015,90000);
                v2.setProprietaire(p1);
                voitureRepo.save(v2);

                Voiture v3 = new Voiture(
                    "Honda","CRV","Bleu","A-3-7090",2016,140000);
                v3.setProprietaire(p2);
                voitureRepo.save(v3);
            }
        };
    }
}