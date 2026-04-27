<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route('/hello', name: 'hello', methods: ['GET'])]
    public function hello(): JsonResponse
    {
        return $this->json([
            'message' => 'Hello from Symfony!',
            'version' => \Symfony\Component\HttpKernel\Kernel::VERSION,
            'timestamp' => (new \DateTimeImmutable())->format(\DateTimeInterface::ATOM),
        ]);
    }
}
