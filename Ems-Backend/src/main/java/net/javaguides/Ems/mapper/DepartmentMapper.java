package net.javaguides.Ems.mapper;

import net.javaguides.Ems.dto.DepartmentDto;
import net.javaguides.Ems.entity.Department;

public class DepartmentMapper {

    private DepartmentMapper() {
    }

    public static DepartmentDto mapToDto(Department department, long employeeCount) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setDescription(department.getDescription());
        dto.setEmployeeCount(employeeCount);
        return dto;
    }

    public static Department mapToEntity(DepartmentDto dto) {
        Department department = new Department();
        department.setId(dto.getId());
        department.setName(dto.getName());
        department.setDescription(dto.getDescription());
        return department;
    }
}
