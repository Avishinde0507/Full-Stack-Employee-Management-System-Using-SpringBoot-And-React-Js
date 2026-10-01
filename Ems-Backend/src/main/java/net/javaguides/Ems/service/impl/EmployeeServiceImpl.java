package net.javaguides.Ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.javaguides.Ems.dto.EmployeeDto;
import net.javaguides.Ems.dto.PageResponseDto;
import net.javaguides.Ems.entity.Department;
import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.exception.DuplicateResourceException;
import net.javaguides.Ems.exception.ResourceNotFoundException;
import net.javaguides.Ems.mapper.EmployeeMapper;
import net.javaguides.Ems.repository.DepartmentRepository;
import net.javaguides.Ems.repository.EmployeeRepository;
import net.javaguides.Ems.repository.spec.EmployeeSpecification;
import net.javaguides.Ems.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private static final Set<String> SORTABLE_FIELDS = Set.of(
            "id", "firstName", "lastName", "email", "designation", "salary", "dateOfJoining", "status"
    );

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        if (employeeRepository.existsByEmailIgnoreCase(employeeDto.getEmail())) {
            throw new DuplicateResourceException("An employee with email '" + employeeDto.getEmail() + "' already exists");
        }

        Department department = resolveDepartment(employeeDto.getDepartmentId());
        Employee employee = EmployeeMapper.mapToEntity(employeeDto, department);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToDto(savedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = findEmployeeOrThrow(employeeId);
        return EmployeeMapper.mapToDto(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDto<EmployeeDto> getAllEmployees(int pageNo, int pageSize, String sortBy, String sortDir,
                                                         String keyword, Long departmentId, String status) {

        String safeSortBy = SORTABLE_FIELDS.contains(sortBy) ? sortBy : "id";
        Sort sort = "desc".equalsIgnoreCase(sortDir) ? Sort.by(safeSortBy).descending() : Sort.by(safeSortBy).ascending();
        Pageable pageable = PageRequest.of(Math.max(pageNo, 0), Math.max(pageSize, 1), sort);

        Specification<Employee> spec = EmployeeSpecification.filterBy(keyword, departmentId, status);
        Page<Employee> employeePage = employeeRepository.findAll(spec, pageable);

        List<EmployeeDto> content = employeePage.getContent().stream()
                .map(EmployeeMapper::mapToDto)
                .collect(Collectors.toList());

        PageResponseDto<EmployeeDto> response = new PageResponseDto<>();
        response.setContent(content);
        response.setPageNo(employeePage.getNumber());
        response.setPageSize(employeePage.getSize());
        response.setTotalElements(employeePage.getTotalElements());
        response.setTotalPages(employeePage.getTotalPages());
        response.setLast(employeePage.isLast());
        return response;
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = findEmployeeOrThrow(employeeId);

        if (employeeRepository.existsByEmailIgnoreCaseAndIdNot(updatedEmployee.getEmail(), employeeId)) {
            throw new DuplicateResourceException("An employee with email '" + updatedEmployee.getEmail() + "' already exists");
        }

        Department department = resolveDepartment(updatedEmployee.getDepartmentId());
        EmployeeMapper.applyDtoToEntity(updatedEmployee, department, employee);

        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToDto(savedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = findEmployeeOrThrow(employeeId);
        employeeRepository.delete(employee);
    }

    private Employee findEmployeeOrThrow(Long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + employeeId));
    }

    private Department resolveDepartment(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department does not exist with id: " + departmentId));
    }
}
