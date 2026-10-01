package net.javaguides.Ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalEmployees;
    private long totalDepartments;
    private long activeEmployees;
    private long inactiveEmployees;
    private List<DepartmentCountDto> departmentWiseCount;
    private List<EmployeeDto> recentEmployees;
}
