package net.javaguides.Ems.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDto {

    private Long id;

    @NotBlank(message = "Department name is required")
    private String name;

    private String description;

    // Read-only, computed by the server
    private Long employeeCount;
}
