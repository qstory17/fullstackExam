package com.example.guestbook.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guestbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;
    private String content;

    private LocalDateTime createdAt;

    // 데이터가 저장되기 전에 실행되어(포인트!) 시간을 자동으로 넣어주는 녀석
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
