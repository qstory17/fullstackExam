package com.example.guestbook.repository;

import com.example.guestbook.domain.Guestbook;
import org.springframework.data.jpa.repository.JpaRepository;

// DB에 CRUD(생성, 조회 등)를 대신 해주는 인터페이스
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
}
