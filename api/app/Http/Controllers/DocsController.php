<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DocsController extends Controller
{
    /**
     * Resolve and return the markdown content for a given documentation slug.
     *
     * @param Request $request
     * @param string|null $slug
     * @return JsonResponse
     */
    public function getDoc(Request $request, ?string $slug = null): JsonResponse
    {
        $slug = trim($slug ?? '', '/');
        if (empty($slug)) {
            $slug = 'index';
        }

        // Friendly slug aliases for common variations
        $slugAliases = [
            'fleet-ops' => 'fleet-ops/index',
            'fleet-ops/settings/telematics' => 'fleet-ops/connectivity/telematics/overview',
            'fleet-ops/getting-started/overview' => 'fleet-ops/index',
            'fleet-ops/getting-started' => 'fleet-ops/getting-started/quickstart',
        ];
        if (isset($slugAliases[$slug])) {
            $slug = $slugAliases[$slug];
        }

        // Security check: prevent directory traversal
        if (str_contains($slug, '..') || str_contains($slug, '\\') || str_contains($slug, "\0")) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid documentation path'
            ], 400);
        }

        // Determine docs base directory
        $docsDir = env('DOCS_PATH');
        if (!$docsDir || !is_dir($docsDir)) {
            if (is_dir(base_path('../docs'))) {
                $docsDir = base_path('../docs');
            } elseif (is_dir(base_path('docs'))) {
                $docsDir = base_path('docs');
            } else {
                $docsDir = '/fleetbase/docs';
            }
        }

        $docsDir = rtrim(str_replace('\\', '/', $docsDir), '/');

        // Determine preferred language
        $langParam = strtolower($request->query('lang', ''));
        $acceptLang = strtolower($request->header('Accept-Language', ''));
        $isSpanish = str_starts_with($langParam, 'es') || (empty($langParam) && str_contains($acceptLang, 'es'));

        // Build file candidate list in order of preference
        $candidates = [];

        if ($isSpanish) {
            $candidates[] = ['path' => "{$docsDir}/{$slug}_es.md", 'lang' => 'es'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}/index_es.md", 'lang' => 'es'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}.md", 'lang' => 'en'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}/index.md", 'lang' => 'en'];
        } else {
            $candidates[] = ['path' => "{$docsDir}/{$slug}.md", 'lang' => 'en'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}/index.md", 'lang' => 'en'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}_es.md", 'lang' => 'es'];
            $candidates[] = ['path' => "{$docsDir}/{$slug}/index_es.md", 'lang' => 'es'];
        }

        $matchedFile = null;
        $matchedLang = 'en';

        foreach ($candidates as $cand) {
            if (file_exists($cand['path']) && is_file($cand['path'])) {
                $matchedFile = $cand['path'];
                $matchedLang = $cand['lang'];
                break;
            }
        }

        if (!$matchedFile) {
            return response()->json([
                'status' => 'error',
                'message' => "Documentation not found for slug: {$slug}"
            ], 404);
        }

        $rawContent = file_get_contents($matchedFile);

        // Extract title and parse frontmatter if present
        $title = $this->extractTitle($rawContent, $slug);
        $cleanContent = $this->stripFrontmatter($rawContent);

        // Pre-render Markdown to HTML via Laravel Str::markdown()
        $html = '';
        if (class_exists(\Illuminate\Support\Str::class) && method_exists(\Illuminate\Support\Str::class, 'markdown')) {
            $html = \Illuminate\Support\Str::markdown($cleanContent);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'slug' => $slug,
                'title' => $title,
                'lang' => $matchedLang,
                'content' => $cleanContent,
                'html' => $html
            ]
        ]);
    }

    /**
     * Extract a human-readable title from frontmatter, first H1, or slug.
     */
    private function extractTitle(string $content, string $slug): string
    {
        // 1. Check YAML frontmatter for title: "..."
        if (preg_match('/^---\s*[\r\n]+(.*?)\s*[\r\n]+---/s', $content, $matches)) {
            if (preg_match('/title:\s*["\']?([^"\r\n]+)["\']?/', $matches[1], $titleMatch)) {
                return trim($titleMatch[1]);
            }
        }

        // 2. Check first Markdown # Heading
        if (preg_match('/^#\s+([^\r\n]+)/m', $content, $matches)) {
            return trim($matches[1]);
        }

        // 3. Fallback: generate title from slug
        $basename = basename($slug);
        if ($basename === 'overview' || $basename === 'index') {
            $parts = explode('/', $slug);
            $basename = count($parts) > 1 ? $parts[count($parts) - 2] : $basename;
        }

        return ucwords(str_replace(['-', '_'], ' ', $basename));
    }

    /**
     * Remove frontmatter block from content if present so markdown parser receives clean text.
     */
    private function stripFrontmatter(string $content): string
    {
        return preg_replace('/^---\s*[\r\n]+.*?\s*[\r\n]+---\s*[\r\n]*/s', '', $content);
    }
}
