package net.javaguides.Ems.mapper;

import net.javaguides.Ems.dto.EmployeeDto;
import net.javaguides.Ems.entity.Department;
import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.entity.EmployeeStatus;
import net.javaguides.Ems.entity.Gender;

public class EmployeeMapper {

    private EmployeeMapper() {
    }

    public static EmployeeDto mapToDto(Employee employee) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setGender(employee.getGender() != null ? employee.getGender().name() : null);
        dto.setDateOfBirth(employee.getDateOfBirth());
        dto.setDateOfJoining(employee.getDateOfJoining());
        dto.setDesignation(employee.getDesignation());
        dto.setSalary(employee.getSalary());
        dto.setAddress(employee.getAddress());
        dto.setStatus(employee.getStatus() != null ? employee.getStatus().name() : null);
        dto.setProfileImage(employee.getProfileImage());

        Department department = employee.getDepartment();
        if (department != null) {
            dto.setDepartmentId(department.getId());
            dto.setDepartmentName(department.getName());
        }
        return dto;
    }

    /**
     * Maps a DTO onto a (possibly new) Employee entity. The resolved Department
     * entity must be looked up by the caller (service layer) and passed in here,
     * since the mapper has no repository access.
     */
    public static Employee mapToEntity(EmployeeDto dto, Department department) {
        Employee employee = new Employee();
        employee.setId(dto.getId());
        applyDtoToEntity(dto, department, employee);
        return employee;
    }

    public static void applyDtoToEntity(EmployeeDto dto, Department department, Employee employee) {
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setEmail(dto.getEmail());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setGender(dto.getGender() != null && !dto.getGender().isBlank()
                ? Gender.valueOf(dto.getGender().toUpperCase())
                : null);
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setDateOfJoining(dto.getDateOfJoining());
        employee.setDesignation(dto.getDesignation());
        employee.setSalary(dto.getSalary());
        employee.setAddress(dto.getAddress());
        employee.setStatus(dto.getStatus() != null && !dto.getStatus().isBlank()
                ? EmployeeStatus.valueOf(dto.getStatus().toUpperCase())
                : EmployeeStatus.ACTIVE);
        employee.setProfileImage(dto.getProfileImage());
        employee.setDepartment(department);
    }
}
