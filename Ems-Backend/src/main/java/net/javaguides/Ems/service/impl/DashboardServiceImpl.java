package net.javaguides.Ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.javaguides.Ems.dto.DashboardStatsDto;
import net.javaguides.Ems.dto.DepartmentCountDto;
import net.javaguides.Ems.dto.EmployeeDto;
import net.javaguides.Ems.entity.Department;
import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.entity.EmployeeStatus;
import net.javaguides.Ems.mapper.EmployeeMapper;
import net.javaguides.Ems.repository.DepartmentRepository;
import net.javaguides.Ems.repository.EmployeeRepository;
import net.javaguides.Ems.service.DashboardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public DashboardStatsDto getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long totalDepartments = departmentRepository.count();
        long activeEmployees = employeeRepository.countByStatus(EmployeeStatus.ACTIVE);
        long inactiveEmployees = employeeRepository.countByStatus(EmployeeStatus.INACTIVE);

        List<Department> departments = departmentRepository.findAll();
        List<DepartmentCountDto> departmentWiseCount = departments.stream()
                .map(dept -> new DepartmentCountDto(dept.getName(), employeeRepository.countByDepartmentId(dept.getId())))
                .collect(Collectors.toList());

        List<Employee> recent = employeeRepository.findTop5ByOrderByDateOfJoiningDesc();
        List<EmployeeDto> recentEmployees = recent.stream()
                .map(EmployeeMapper::mapToDto)
                .collect(Collectors.toList());

        return new DashboardStatsDto(totalEmployees, totalDepartments, activeEmployees, inactiveEmployees,
                departmentWiseCount, recentEmployees);
    }
}
