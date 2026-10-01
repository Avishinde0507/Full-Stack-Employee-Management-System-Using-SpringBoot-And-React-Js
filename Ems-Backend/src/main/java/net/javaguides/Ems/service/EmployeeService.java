package net.javaguides.Ems.service;

import net.javaguides.Ems.dto.EmployeeDto;
import net.javaguides.Ems.dto.PageResponseDto;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    PageResponseDto<EmployeeDto> getAllEmployees(int pageNo, int pageSize, String sortBy, String sortDir,
                                                  String keyword, Long departmentId, String status);

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeId);
}
