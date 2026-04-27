<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route('/hello', name: 'hello', methods: ['GET'])]
    public function hello(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();

        return $this->json([
            'message' => 'Hello from Symfony!',
            'version' => \Symfony\Component\HttpKernel\Kernel::VERSION,
            'timestamp' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
            'products' => array_map(static fn(Product $p) => [
                'id'    => $p->getId(),
                'name'  => $p->getName(),
                'price' => $p->getPrice(),
            ], $products),
        ]);
    }

    #[Route('/products', name: 'products', methods: ['GET'])]
    public function products(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();

        $data = array_map(static fn(Product $p) => [
            'id'         => $p->getId(),
            'name'       => $p->getName(),
            'price'      => $p->getPrice(),
            'created_at' => $p->getCreatedAt()->format(\DateTimeInterface::ATOM),
        ], $products);

        return $this->json($data);
    }
}
