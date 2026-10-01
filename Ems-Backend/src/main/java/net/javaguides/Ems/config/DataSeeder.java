package net.javaguides.Ems.config;

import lombok.RequiredArgsConstructor;
import net.javaguides.Ems.entity.Admin;
import net.javaguides.Ems.entity.Department;
import net.javaguides.Ems.entity.Employee;
import net.javaguides.Ems.entity.EmployeeStatus;
import net.javaguides.Ems.entity.Gender;
import net.javaguides.Ems.repository.AdminRepository;
import net.javaguides.Ems.repository.DepartmentRepository;
import net.javaguides.Ems.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Seeds a handful of departments and employees the first time the application
 * runs against an empty database, so the dashboard and lists are populated
 * out of the box instead of showing an empty screen.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final AdminRepository adminRepository;

    @Override
    public void run(String... args) {
        // Seed or update Admin credentials
        seedAdminUser();

        if (departmentRepository.count() > 0) {
            return;
        }

        Department engineering = departmentRepository.save(
                Department.builder().name("Engineering").description("Builds and maintains our products").build());
        Department humanResources = departmentRepository.save(
                Department.builder().name("Human Resources").description("Manages people operations and hiring").build());
        Department finance = departmentRepository.save(
                Department.builder().name("Finance").description("Handles budgeting, payroll and accounting").build());
        Department marketing = departmentRepository.save(
                Department.builder().name("Marketing").description("Drives brand awareness and growth").build());
        Department sales = departmentRepository.save(
                Department.builder().name("Sales").description("Manages client relationships and revenue").build());

        if (employeeRepository.count() > 0) {
            return;
        }

        employeeRepository.save(Employee.builder()
                .firstName("Aarav").lastName("Sharma").email("aarav.sharma@ems.com")
                .phoneNumber("9876543210").gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1992, 4, 12)).dateOfJoining(LocalDate.of(2020, 6, 1))
                .designation("Senior Software Engineer").salary(95000d).address("Pune, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(engineering).build());

        employeeRepository.save(Employee.builder()
                .firstName("Isha").lastName("Verma").email("isha.verma@ems.com")
                .phoneNumber("9876543211").gender(Gender.FEMALE)
                .dateOfBirth(LocalDate.of(1995, 8, 23)).dateOfJoining(LocalDate.of(2021, 2, 15))
                .designation("Software Engineer").salary(72000d).address("Bengaluru, Karnataka")
                .status(EmployeeStatus.ACTIVE).department(engineering).build());

        employeeRepository.save(Employee.builder()
                .firstName("Rohan").lastName("Mehta").email("rohan.mehta@ems.com")
                .phoneNumber("9876543212").gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1990, 1, 5)).dateOfJoining(LocalDate.of(2019, 11, 10))
                .designation("HR Manager").salary(80000d).address("Mumbai, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(humanResources).build());

        employeeRepository.save(Employee.builder()
                .firstName("Neha").lastName("Kulkarni").email("neha.kulkarni@ems.com")
                .phoneNumber("9876543213").gender(Gender.FEMALE)
                .dateOfBirth(LocalDate.of(1993, 6, 30)).dateOfJoining(LocalDate.of(2022, 3, 21))
                .designation("Talent Acquisition Specialist").salary(58000d).address("Pune, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(humanResources).build());

        employeeRepository.save(Employee.builder()
                .firstName("Vikram").lastName("Patil").email("vikram.patil@ems.com")
                .phoneNumber("9876543214").gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1988, 11, 2)).dateOfJoining(LocalDate.of(2018, 7, 18))
                .designation("Finance Manager").salary(90000d).address("Nashik, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(finance).build());

        employeeRepository.save(Employee.builder()
                .firstName("Priya").lastName("Deshpande").email("priya.deshpande@ems.com")
                .phoneNumber("9876543215").gender(Gender.FEMALE)
                .dateOfBirth(LocalDate.of(1996, 3, 14)).dateOfJoining(LocalDate.of(2023, 5, 8))
                .designation("Accountant").salary(52000d).address("Pimpri-Chinchwad, Maharashtra")
                .status(EmployeeStatus.INACTIVE).department(finance).build());

        employeeRepository.save(Employee.builder()
                .firstName("Karan").lastName("Joshi").email("karan.joshi@ems.com")
                .phoneNumber("9876543216").gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1994, 9, 19)).dateOfJoining(LocalDate.of(2021, 9, 1))
                .designation("Marketing Lead").salary(76000d).address("Pune, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(marketing).build());

        employeeRepository.save(Employee.builder()
                .firstName("Sneha").lastName("Rane").email("sneha.rane@ems.com")
                .phoneNumber("9876543217").gender(Gender.FEMALE)
                .dateOfBirth(LocalDate.of(1997, 12, 27)).dateOfJoining(LocalDate.of(2024, 1, 16))
                .designation("Content Strategist").salary(48000d).address("Thane, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(marketing).build());

        employeeRepository.save(Employee.builder()
                .firstName("Aditya").lastName("Kale").email("aditya.kale@ems.com")
                .phoneNumber("9876543218").gender(Gender.MALE)
                .dateOfBirth(LocalDate.of(1991, 5, 8)).dateOfJoining(LocalDate.of(2020, 10, 5))
                .designation("Sales Manager").salary(85000d).address("Nagpur, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(sales).build());

        employeeRepository.save(Employee.builder()
                .firstName("Ananya").lastName("Iyer").email("ananya.iyer@ems.com")
                .phoneNumber("9876543219").gender(Gender.FEMALE)
                .dateOfBirth(LocalDate.of(1998, 2, 2)).dateOfJoining(LocalDate.of(2024, 8, 12))
                .designation("Business Development Executive").salary(45000d).address("Pune, Maharashtra")
                .status(EmployeeStatus.ACTIVE).department(sales).build());
    }

    private void seedAdminUser() {
        String adminEmail = "avishkarshinde0507@gmail.com";
        String adminPassword = "Avi_Shinde_0507";
        String adminName = "Avishkar Shinde";

        adminRepository.findByEmail(adminEmail).ifPresentOrElse(
                existingAdmin -> {
                    existingAdmin.setPassword(adminPassword);
                    existingAdmin.setFullName(adminName);
                    existingAdmin.setRole("ADMIN");
                    adminRepository.save(existingAdmin);
                },
                () -> {
                    adminRepository.save(Admin.builder()
                            .fullName(adminName)
                            .email(adminEmail)
                            .password(adminPassword)
                            .role("ADMIN")
                            .build());
                }
        );
    }
}
