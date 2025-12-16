package com.example.guestbook.repository;

import com.example.guestbook.domain.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;

// DB자동저장 인터페이스
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
}
