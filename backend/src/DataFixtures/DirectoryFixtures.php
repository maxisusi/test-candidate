<?php

namespace App\DataFixtures;

use App\Entity\Department;
use App\Entity\Employee;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DirectoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $engineering = new Department('Engineering');
        $sales = new Department('Sales');
        $hr = new Department('Human Resources');

        $manager->persist($engineering);
        $manager->persist($sales);
        $manager->persist($hr);

        $alice = new Employee('Alice', 'Martin', $engineering);
        $bob = new Employee('Bob', 'Dupont', $engineering);
        $carol = new Employee('Carol', 'Nguyen', $engineering);
        $john = new Employee('John', 'Doe', null);
        $bob->setManager($alice);
        $carol->setManager($alice);

        $david = new Employee('David', 'Schmidt', $sales);
        $eve = new Employee('Eve', 'Rossi', $sales);
        $eve->setManager($david);

        $frank = new Employee('Frank', 'Bianchi', $hr);

        foreach ([$alice, $bob, $carol, $john, $david, $eve, $frank] as $employee) {
            $manager->persist($employee);
        }

        $manager->flush();
    }
}
