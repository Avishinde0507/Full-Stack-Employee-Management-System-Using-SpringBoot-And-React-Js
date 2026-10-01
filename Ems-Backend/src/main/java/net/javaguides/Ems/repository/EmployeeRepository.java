package net.javaguides.Ems.repository;

import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);

    long countByDepartmentId(Long departmentId);

    long countByStatus(EmployeeStatus status);

    List<Employee> findTop5ByOrderByDateOfJoiningDesc();
}
