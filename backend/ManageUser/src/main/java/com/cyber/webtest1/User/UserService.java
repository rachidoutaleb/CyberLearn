package com.cyber.webtest1.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class UserService {

    private final UserRepository repo;
    private final UserHistoryRepository historyRepo;
    private static final Logger LOGGER = Logger.getLogger(UserService.class.getName());

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public UserService(UserRepository repo, UserHistoryRepository historyRepo) {
        this.repo = repo;
        this.historyRepo = historyRepo;
    }

    public List<User> listAll() {
        return repo.findAllByOrderByIdAsc();
    }

    @Transactional
    public void save(User user) {
        LOGGER.log(Level.INFO, "Saving user: {0}", user);
        boolean isNew = user.getId() == null;
        user.setLastModified(new Date());
        if (isNew) {
            User savedUser = repo.save(user);
            logUserHistory(savedUser, "ADD", null, null);
        } else {
            User oldUser = repo.findById(user.getId()).orElse(null);
            String modifiedFields = getModifiedFields(oldUser, user);
            User savedUser = repo.save(user);
            logUserHistory(savedUser, "UPDATE", modifiedFields, oldUser);
        }
    }

    public User get(Long id) throws UserNotFoundException {
        Optional<User> result = repo.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        throw new UserNotFoundException("Could not find any users with ID " + id);
    }

    @Transactional
    public void delete(Long id) throws UserNotFoundException {
        if (!repo.existsById(id)) {
            throw new UserNotFoundException("Could not find any users with ID " + id);
        }
        User user = repo.findById(id).orElseThrow(() -> new UserNotFoundException("Could not find any users with ID " + id));
        repo.deleteById(id);
        logUserHistory(user, "DELETE", null, null);
        decrementIds(id);
        resetAutoIncrement();
    }

    @Transactional
    public void decrementIds(Long deletedId) {
        entityManager.createNativeQuery("UPDATE users SET id = id - 1 WHERE id > ?1")
                .setParameter(1, deletedId)
                .executeUpdate();
    }

    @Transactional
    public void resetAutoIncrement() {
        Long maxId = entityManager.createQuery("SELECT COALESCE(MAX(u.id), 0) FROM User u", Long.class).getSingleResult();
        entityManager.createNativeQuery("ALTER TABLE users AUTO_INCREMENT = " + (maxId + 1)).executeUpdate();
    }

    private void logUserHistory(User user, String action, String modifiedFields, User oldUser) {
        UserHistory history = new UserHistory();
        history.setUserId(user.getId());
        history.setAction(action);
        history.setName(user.getName());
        history.setEmail(user.getEmail());
        history.setRole(user.getRole().name());  // Convert Role to String
        history.setActionDate(new Date());
        history.setModifiedFields(modifiedFields);
        if (oldUser != null) {
            history.setOldName(oldUser.getName());
            history.setOldEmail(oldUser.getEmail());
            history.setOldRole(oldUser.getRole().name());  // Convert Role to String
        }
        historyRepo.save(history);
    }

    private String getModifiedFields(User oldUser, User newUser) {
        if (oldUser == null) return null;

        StringBuilder modifiedFields = new StringBuilder();
        if (!oldUser.getName().equals(newUser.getName())) {
            modifiedFields.append("Name, ");
        }
        if (!oldUser.getEmail().equals(newUser.getEmail())) {
            modifiedFields.append("Email, ");
        }
        if (!oldUser.getRole().equals(newUser.getRole())) {
            modifiedFields.append("Role, ");
        }
        return modifiedFields.length() > 0 ? modifiedFields.substring(0, modifiedFields.length() - 2) : null;
    }

    public List<UserHistory> listUserHistory() {
        return historyRepo.findAll();
    }
}
