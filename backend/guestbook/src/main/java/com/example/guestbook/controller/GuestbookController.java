package com.example.guestbook.controller;

import com.example.guestbook.domain.Guestbook;
import com.example.guestbook.repository.GuestbookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/guestbooks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // CORS 허용
public class GuestbookController {

    private final GuestbookRepository repository;

    // 조회
    @GetMapping
    public List<Guestbook> getAll() {
        return repository.findAll();
    }

    // 등록
    @PostMapping
    public Guestbook create(@RequestBody Guestbook guestbook) {
        return repository.save(guestbook);
    }
}
