package org.cours.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voitures")
@RequiredArgsConstructor
public class VoitureController {

    private final VoitureRepo voitureRepo;

    @GetMapping
    public Iterable<Voiture> getAll() {
        return voitureRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getById(@PathVariable Long id) {
        return voitureRepo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Voiture create(@Valid @RequestBody Voiture voiture) {
        return voitureRepo.save(voiture);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Voiture> update(
            @PathVariable Long id,
            @Valid @RequestBody Voiture voiture) {
        if (!voitureRepo.existsById(id))
            return ResponseEntity.notFound().build();
        voiture.setId(id);
        return ResponseEntity.ok(voitureRepo.save(voiture));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Voiture> delete(@PathVariable Long id) {
        return voitureRepo.findById(id).map(v -> {
            voitureRepo.delete(v);
            return ResponseEntity.ok(v);
        }).orElse(ResponseEntity.notFound().build());
    }
}