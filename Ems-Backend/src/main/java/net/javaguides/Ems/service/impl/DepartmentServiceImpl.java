package net.javaguides.Ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.javaguides.Ems.dto.DepartmentDto;
import net.javaguides.Ems.entity.Department;
import net.javaguides.Ems.exception.DepartmentNotEmptyException;
import net.javaguides.Ems.exception.DuplicateResourceException;
import net.javaguides.Ems.exception.ResourceNotFoundException;
import net.javaguides.Ems.mapper.DepartmentMapper;
import net.javaguides.Ems.repository.DepartmentRepository;
import net.javaguides.Ems.repository.EmployeeRepository;
import net.javaguides.Ems.service.DepartmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        if (departmentRepository.existsByNameIgnoreCase(departmentDto.getName())) {
            throw new DuplicateResourceException("A department named '" + departmentDto.getName() + "' already exists");
        }
        Department department = DepartmentMapper.mapToEntity(departmentDto);
        Department saved = departmentRepository.save(department);
        return DepartmentMapper.mapToDto(saved, 0L);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream()
                .map(dept -> DepartmentMapper.mapToDto(dept, employeeRepository.countByDepartmentId(dept.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = findDepartmentOrThrow(departmentId);
        long count = employeeRepository.countByDepartmentId(departmentId);
        return DepartmentMapper.mapToDto(department, count);
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto) {
        Department department = findDepartmentOrThrow(departmentId);

        if (departmentRepository.existsByNameIgnoreCaseAndIdNot(departmentDto.getName(), departmentId)) {
            throw new DuplicateResourceException("A department named '" + departmentDto.getName() + "' already exists");
        }

        department.setName(departmentDto.getName());
        department.setDescription(departmentDto.getDescription());
        Department saved = departmentRepository.save(department);

        long count = employeeRepository.countByDepartmentId(departmentId);
        return DepartmentMapper.mapToDto(saved, count);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = findDepartmentOrThrow(departmentId);

        long employeeCount = employeeRepository.countByDepartmentId(departmentId);
        if (employeeCount > 0) {
            throw new DepartmentNotEmptyException(
                    "Cannot delete '" + department.getName() + "' because it still has " + employeeCount
                            + " employee(s) assigned. Reassign them first.");
        }

        departmentRepository.delete(department);
    }

    private Department findDepartmentOrThrow(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id: " + departmentId));
    }
}
