package com.kumar.blogapi.users;

import com.kumar.blogapi.commons.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity extends BaseEntity {



    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private int id;


    @Column(nullable = false,name="username", length = 45)
    String userName;

    @Column(nullable = false, name="email", unique = true, length = 45)
    String email;

    @Column(length = 250 ,name="password", nullable = false)
    String password;

    @Temporal(TemporalType.DATE)
    @Column(name="dob")
    private LocalDate dateOfBirth;


    @Column(name="profession", length = 100)
    private String profession;

    @Column(name="institution",length = 100)
    private String institution;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 45, name="role")
    private Role role;

    private Boolean locked = false;
    private Boolean enabled = false;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_modified")
    private Date lastModified;

    public enum Role {
        USER, ADMIN
    }

}
