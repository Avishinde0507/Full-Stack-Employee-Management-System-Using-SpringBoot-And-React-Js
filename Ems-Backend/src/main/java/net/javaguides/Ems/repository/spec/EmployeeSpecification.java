package net.javaguides.Ems.repository.spec;

import jakarta.persistence.criteria.Predicate;
import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.entity.EmployeeStatus;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class EmployeeSpecification {

    private EmployeeSpecification() {
    }

    public static Specification<Employee> filterBy(String keyword, Long departmentId, String status) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isBlank()) {
                String likePattern = "%" + keyword.trim().toLowerCase() + "%";
                Predicate firstNameMatch = cb.like(cb.lower(root.get("firstName")), likePattern);
                Predicate lastNameMatch = cb.like(cb.lower(root.get("lastName")), likePattern);
                Predicate emailMatch = cb.like(cb.lower(root.get("email")), likePattern);
                Predicate designationMatch = cb.like(cb.lower(root.get("designation")), likePattern);
                predicates.add(cb.or(firstNameMatch, lastNameMatch, emailMatch, designationMatch));
            }

            if (departmentId != null) {
                predicates.add(cb.equal(root.get("department").get("id"), departmentId));
            }

            if (status != null && !status.isBlank()) {
                try {
                    predicates.add(cb.equal(root.get("status"), EmployeeStatus.valueOf(status.trim().toUpperCase())));
                } catch (IllegalArgumentException ignored) {
                    // unknown status value supplied - ignore the filter rather than failing the request
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
