package com.skaly.fashion_backend.product;

import com.skaly.fashion_backend.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Category not found with id: " + request.categoryId()));

        Product product = Product.builder()
                .name(request.name())
                .description(request.description())
                .basePrice(request.basePrice())
                .category(category)
                .build();

        if (request.variants() != null) {
            for (ProductVariantDto variantDto : request.variants()) {
                ProductVariant variant = productMapper.toProductVariant(variantDto);
                product.addVariant(variant);
            }
        }

        Product savedProduct = productRepository.save(product);
        return productMapper.toProductResponse(savedProduct);
    }

    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::toProductResponse);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return productMapper.toProductResponse(product);
    }

    @Transactional(readOnly = true)
    public ProductVariant getProductVariantById(UUID id) {
        return productVariantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product Variant not found with id: " + id));
    }

    @Transactional
    public void reduceStock(UUID variantId, Integer quantity) {
        ProductVariant variant = getProductVariantById(variantId);

        if (variant.getStockQuantity() < quantity) {
            throw new IllegalStateException(
                    "Not enough stock for product: " + variant.getProduct().getName() + " " + variant.getSize());
        }

        variant.setStockQuantity(variant.getStockQuantity() - quantity);
        productVariantRepository.save(variant);
    }
}
