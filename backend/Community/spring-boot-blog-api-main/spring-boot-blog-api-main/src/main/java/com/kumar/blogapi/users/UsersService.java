package com.kumar.blogapi.users;

import com.kumar.blogapi.users.dto.CreateUserDTO;
import com.kumar.blogapi.users.dto.UserResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final UsersRepository usersRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UsersService(UsersRepository usersRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO createUser(CreateUserDTO userDTO) {
        if(userDTO == null) {
            throw new UserDataMissingException();
        }
        if(checkIfUserExist(userDTO.getEmail())) {
            throw new UserAlreadyExistException(userDTO.getEmail());
        }

        var userEntityToSave = modelMapper.map(userDTO, UserEntity.class);
        userEntityToSave.setPassword(passwordEncoder.encode(userEntityToSave.getPassword()));
        var savedUserEntity = usersRepository.save(userEntityToSave);

        return modelMapper.map(savedUserEntity, UserResponseDTO.class);
    }

    public UserEntity getUserById(Integer userId) {
        var optionalUserEntity = usersRepository.findById(userId);
        if(optionalUserEntity.isPresent()) {
            return optionalUserEntity.get();
        }
        throw new UsersService.UserNotFoundException(userId);
    }

    public UserEntity findByUserName(String userName) {
        return usersRepository.findByUserName(userName)
                .orElseThrow(() -> new UserNotFoundException(userName));
    }

    private boolean checkIfUserExist(String email) {
        return usersRepository.findByEmail(email) != null;
    }

    public static class UserDataMissingException extends IllegalArgumentException {
        public UserDataMissingException() {
            super("User data missing for creation");
        }
    }

    public static class UserAlreadyExistException extends IllegalArgumentException {
        public UserAlreadyExistException(String email) {
            super("User with " + email + " email already exists");
        }
    }

    public static class UserNotFoundException extends IllegalArgumentException {
        public UserNotFoundException(Integer id) {
            super("User with id " + id + " is not found");
        }

        public UserNotFoundException(String userName) {
            super("User with username " + userName + " is not found");
        }
    }
}
