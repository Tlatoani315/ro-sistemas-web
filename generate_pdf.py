import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
)
from reportlab.pdfgen import canvas

# Colores Corporativos Premium Dark-Green
BG_COLOR = colors.HexColor('#0c0d12')      # Fondo oscuro
CARD_COLOR = colors.HexColor('#13141a')    # Fondo de tarjeta
BORDER_COLOR = colors.HexColor('#22242f')  # Borde gris oscuro
ACCENT_COLOR = colors.HexColor('#00e676')  # Verde neón corporativo
TEXT_WHITE = colors.HexColor('#ffffff')    # Texto principal
TEXT_MUTED = colors.HexColor('#a3a8b4')    # Texto secundario

class NumberedCanvas(canvas.Canvas):
    """
    Canvas personalizado para calcular y renderizar el pie de página
    y la numeración dinámica después de recopilar todas las páginas.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_elements(num_pages)
            super().showPage()
        super().save()

    def draw_page_elements(self, page_count):
        self.saveState()
        
        # Omitir cabecera y pie de página en la portada (página 1)
        if self._pageNumber > 1:
            # 1. Dibujar línea neón superior de la cabecera
            self.setStrokeColor(ACCENT_COLOR)
            self.setLineWidth(1)
            self.line(54, letter[1] - 40, letter[0] - 54, letter[1] - 40)
            
            # Texto de cabecera
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(TEXT_MUTED)
            self.drawString(54, letter[1] - 34, "CAOMI SISTEMAS INFORMÁTICOS & GRUPO RO+")
            
            # 2. Dibujar pie de página
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(1)
            self.line(54, 50, letter[0] - 54, 50)
            
            # Numeración de página
            self.setFont("Helvetica", 8)
            self.setFillColor(TEXT_MUTED)
            self.drawString(54, 38, "Catálogo de Soluciones Tecnológicas 2026")
            
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(letter[0] - 54, 38, page_text)
            
        self.restoreState()

def draw_background(canvas, doc):
    """
    Callback para pintar el fondo oscuro ANTES de dibujar los flowables.
    De este modo, el texto y las imágenes se renderizan encima del fondo.
    """
    canvas.saveState()
    canvas.setFillColor(BG_COLOR)
    canvas.rect(0, 0, letter[0], letter[1], fill=1, stroke=0)
    canvas.restoreState()

def build_pdf(filename="catalogo.pdf"):
    # Configurar el documento PDF tamaño carta con márgenes de 0.75 pulgadas (54 pt)
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Definición de estilos personalizados
    style_cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=TEXT_WHITE,
        alignment=1, # Centrado
        spaceAfter=15
    )
    
    style_cover_plus = ParagraphStyle(
        'CoverPlus',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=16,
        textColor=ACCENT_COLOR,
        alignment=1,
        spaceAfter=40
    )
    
    style_cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=14,
        leading=18,
        textColor=TEXT_MUTED,
        alignment=1,
        spaceAfter=120
    )
    
    style_h1 = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=TEXT_WHITE,
        spaceBefore=20,
        spaceAfter=15,
        keepWithNext=True
    )
    
    style_h2 = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=ACCENT_COLOR,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    
    style_body = ParagraphStyle(
        'Body',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=TEXT_MUTED,
        spaceAfter=12
    )

    style_card_title = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=ACCENT_COLOR,
        spaceAfter=4
    )
    
    style_card_body = ParagraphStyle(
        'CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_WHITE
    )

    story = []
    
    # ---------------------------------------------------------
    # PAGINA 1: PORTADA
    # ---------------------------------------------------------
    story.append(Spacer(1, 150))
    story.append(Paragraph("CAOMI<font color='#00e676'>RO+</font>", style_cover_title))
    story.append(Paragraph("Sistemas Informáticos & Grupo Comercial", style_cover_plus))
    story.append(Paragraph("CATÁLOGO DE SOLUCIONES Y PERIFÉRICOS 2026", style_cover_subtitle))
    
    story.append(Spacer(1, 50))
    
    # Tabla inferior de la portada con datos rápidos
    portada_data = [
        [
            Paragraph("<b>Ubicación:</b> Ecatepec, Edo. Méx. / Tizayuca, Hgo.", style_card_body),
            Paragraph("<b>Teléfonos:</b> 5526640485 / 5544428732", style_card_body),
            Paragraph("<b>Email:</b> soporte.rosistemasinfo@outlook.com.mx", style_card_body)
        ]
    ]
    t_portada = Table(portada_data, colWidths=[2.2*inch, 2.2*inch, 2.6*inch])
    t_portada.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_COLOR),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR)
    ]))
    story.append(t_portada)
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # PAGINA 2: QUIÉNES SOMOS & VALORES
    # ---------------------------------------------------------
    story.append(Paragraph("Quiénes Somos", style_h1))
    story.append(Paragraph(
        "Fundada en 2009, <b>CAOMI Sistemas Informáticos</b> y <b>Grupo RO+</b> nacieron como una alternativa confiable "
        "para las organizaciones que requieran el apoyo de sistemas de cómputo y TI para alcanzar sus objetivos estratégicos. "
        "Liderada por profesionales con amplia experiencia, nuestra organización brinda cobertura personalizada tanto en "
        "oficinas de consultoría como en tiendas de periféricos y equipos.", style_body
    ))
    
    # Bloques de Misión y Visión
    nosotros_data = [
        [
            Paragraph("MISIÓN", style_card_title),
            Paragraph("VISIÓN", style_card_title)
        ],
        [
            Paragraph("Ofrecer soluciones informáticas accesibles, eficientes y personalizadas que impulsen la modernización tecnológica de empresas, instituciones y comunidades.", style_card_body),
            Paragraph("Ser una empresa reconocida por su innovación, calidad and compromiso en el desarrollo de tecnologías que mejoran los procesos y la vida digital de nuestros clientes.", style_card_body)
        ]
    ]
    t_nosotros = Table(nosotros_data, colWidths=[3.4*inch, 3.4*inch])
    t_nosotros.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_COLOR),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
        ('TOPPADDING', (0,0), (-1,-1), 15),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR)
    ]))
    story.append(t_nosotros)
    story.append(Spacer(1, 20))
    
    story.append(Paragraph("Nuestros Valores", style_h2))
    
    # Lista de valores con sus iconos si existen
    valores = [
        ("Innovación", "Búsqueda constante de nuevas tecnologías y mejoras."),
        ("Compromiso", "Dedicación total para alcanzar el éxito del cliente."),
        ("Calidad", "Puntualidad, excelencia y soporte garantizado en TI."),
        ("Accesibilidad", "Precios razonables y soluciones informáticas integradas."),
        ("Trabajo en Equipo", "Colaboración conjunta entre especialistas de soporte."),
        ("Responsabilidad Social", "Apoyo constante a la digitalización en la comunidad.")
    ]
    
    valores_rows = []
    # Generar celdas en parejas
    for i in range(0, len(valores), 2):
        v1, d1 = valores[i]
        v2, d2 = valores[i+1]
        
        cell1 = Paragraph(f"<b>✦ {v1}:</b> {d1}", style_body)
        cell2 = Paragraph(f"<b>✦ {v2}:</b> {d2}", style_body)
        valores_rows.append([cell1, cell2])
        
    t_valores = Table(valores_rows, colWidths=[3.4*inch, 3.4*inch])
    t_valores.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6)
    ]))
    story.append(t_valores)
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # PAGINA 3: SERVICIOS ESPECIALIZADOS
    # ---------------------------------------------------------
    story.append(Paragraph("Servicios Especializados de TI", style_h1))
    story.append(Paragraph(
        "Nuestras soluciones abarcan todo el espectro tecnológico requerido por la empresa moderna, "
        "desde la consultoría e instalación de redes físicas hasta el desarrollo de plataformas transaccionales avanzadas.", style_body
    ))
    
    servicios_lista = [
        ("Sistemas Especializados de Gestión (ERP, WMS, TMS, POS)", 
         "Desarrollo e integración de plataformas avanzadas para control de inventarios y logística (WMS/Administro), gestión de transporte (TMS), planificación de recursos (ERP) y terminales Punto de Venta (POS) con Facturación Electrónica 4.0 integrada."),
        
        ("Desarrollo de Software a la Medida", 
         "Diseño y construcción de sistemas corporativos y páginas web responsivas con arquitectura premium, bases de datos adaptadas y optimización para motores de búsqueda (SEO)."),
         
        ("Bases de Datos & SQL", 
         "Diseño físico y lógico, optimización de consultas, migración de esquemas complejos y mantenimiento preventivo para bases de datos relacionales (SQL Server, MySQL, SQLite)."),
         
        ("Soporte Técnico y Cableado Estructurado", 
         "Asistencia presencial y remota para mantenimiento de hardware, servidores Windows/Linux, configuración de switches y ruteadores, y tendido de redes estructuradas para oficinas."),
         
        ("Venta de Equipos y Consumibles (RO+)", 
         "Distribución directa de hardware de cómputo de marcas líderes, servidores para data centers, y consumibles de impresión (toner, tintas) al mejor costo del mercado.")
    ]
    
    for titulo, desc in servicios_lista:
        # Dibujar cada servicio como un recuadro cerrado
        card_content = [
            Paragraph(titulo.upper(), style_card_title),
            Spacer(1, 4),
            Paragraph(desc, style_card_body)
        ]
        t_card = Table([[card_content]], colWidths=[6.8*inch])
        t_card.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), CARD_COLOR),
            ('BOTTOMPADDING', (0,0), (-1,-1), 12),
            ('TOPPADDING', (0,0), (-1,-1), 12),
            ('LEFTPADDING', (0,0), (-1,-1), 15),
            ('RIGHTPADDING', (0,0), (-1,-1), 15),
            ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR)
        ]))
        story.append(t_card)
        story.append(Spacer(1, 10))
        
    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # PAGINAS 4 & 5: CATÁLOGO DE PRODUCTOS (Categorías)
    # ---------------------------------------------------------
    story.append(Paragraph("Catálogo Corporativo de Productos", style_h1))
    story.append(Paragraph(
        "Nuestra cartera comercial se divide en 12 categorías que cubren todas las necesidades informáticas "
        "y de oficina para negocios y corporativos.", style_body
    ))
    
    # Lista de 12 categorías con su color de panel (hex) y ruta de imagen
    categorias = [
        ("Accesorios", "#00e676", "img/cat_accesorios.png", "Mouses, teclados, auriculares, cables y adaptadores USB/FireWire."),
        ("Almacenamiento", "#b388ff", "img/cat_almacenamiento.png", "Memorias flash, discos SSD portátiles, NAS, SAN e infraestructura de respaldo."),
        ("Audio / Video", "#ff1744", "img/cat_audiovideo.png", "Cámaras, audio profesional, teatros en casa y pantallas de proyección."),
        ("Computadoras", "#00e5ff", "img/cat_computadoras.png", "Laptops, servidores empresariales, workstations y computadoras Gaming."),
        ("Equipamiento Telefónico", "#c6ff00", "img/cat_telefonia.png", "Dispositivos IP PBX, equipos de conferencia, diademas y teléfonos."),
        ("Impresoras y Plotters", "#ff5252", "img/cat_impresoras.png", "Impresoras láser, sistemas multifuncionales y plotters de alta resolución."),
        ("Protección Eléctrica", "#ff4081", "img/cat_proteccion.png", "Reguladores, fuentes de poder y sistemas UPS de respaldo CDP."),
        ("Punto de Venta & AIDC", "#7b1fa2", "img/cat_pos.png", "Lectores de barras, cajones, impresoras térmicas POS y terminales."),
        ("Redes", "#8bc34a", "img/cat_redes.png", "Switches, routers Cisco/Tp-Link, seguridad de redes y conectividad."),
        ("Software", "#ffd54f", "img/cat_software.png", "Sistemas operativos Windows, licencias Office y antivirus corporativos."),
        ("Suministros", "#ff9800", "img/cat_suministros.png", "Cartuchos de tinta y toner HP/Epson, consumibles de impresión."),
        ("Papelería de Oficina", "#7e57c2", "img/cat_papeleria.png", "Útiles escolares, didácticos, cuadernos y archivo corporativo.")
    ]
    
    # Renderizar en filas de 2 categorías por página para totalizar 2 páginas de catálogo (6 categorías por página)
    for i in range(0, len(categorias), 2):
        cat_left = categorias[i]
        cat_right = categorias[i+1]
        
        # Procesar categoría izquierda
        cl_name, cl_color, cl_img_path, cl_desc = cat_left
        img_left = None
        if os.path.exists(cl_img_path):
            img_left = Image(cl_img_path, width=1.1*inch, height=0.9*inch)
            
        cell_left_content = [
            Paragraph(f"<font color='{cl_color}'><b>{cl_name.upper()}</b></font>", style_card_title),
            Spacer(1, 4),
            Paragraph(cl_desc, style_card_body)
        ]
        
        # Tabla interna para alinear imagen y texto
        t_left_inner_data = [[cell_left_content, img_left]] if img_left else [[cell_left_content, ""]]
        t_left_inner = Table(t_left_inner_data, colWidths=[2.1*inch, 1.2*inch])
        t_left_inner.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        
        # Procesar categoría derecha
        cr_name, cr_color, cr_img_path, cr_desc = cat_right
        img_right = None
        if os.path.exists(cr_img_path):
            img_right = Image(cr_img_path, width=1.1*inch, height=0.9*inch)
            
        cell_right_content = [
            Paragraph(f"<font color='{cr_color}'><b>{cr_name.upper()}</b></font>", style_card_title),
            Spacer(1, 4),
            Paragraph(cr_desc, style_card_body)
        ]
        
        t_right_inner_data = [[cell_right_content, img_right]] if img_right else [[cell_right_content, ""]]
        t_right_inner = Table(t_right_inner_data, colWidths=[2.1*inch, 1.2*inch])
        t_right_inner.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        
        # Meter ambas en la fila
        t_row = Table([[t_left_inner, t_right_inner]], colWidths=[3.4*inch, 3.4*inch])
        t_row.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), CARD_COLOR),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 10),
            ('TOPPADDING', (0,0), (-1,-1), 10),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
            ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
            ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR)
        ]))
        
        story.append(t_row)
        story.append(Spacer(1, 10))
        
        # Salto de página a la mitad del catálogo para mantener orden (después de 6 categorías / 3 filas)
        if i == 4:
            story.append(PageBreak())
            story.append(Paragraph("Catálogo Corporativo de Productos (Cont.)", style_h1))
            story.append(Spacer(1, 10))

    story.append(PageBreak())
    
    # ---------------------------------------------------------
    # PAGINA 6: UBICACIÓN Y CONTACTO
    # ---------------------------------------------------------
    story.append(Paragraph("Contacto y Cotizaciones", style_h1))
    story.append(Paragraph(
        "Para solicitar soporte técnico, consultoría de redes, licencias de software o adquirir periféricos del catálogo, "
        "visítanos en nuestras sucursales o ponte en contacto con nosotros directamente.", style_body
    ))
    
    # Cajas de sucursales
    sucursales_data = [
        [
            Paragraph("OFICINA ECATEPEC", style_card_title),
            Paragraph("TIENDA TIZAYUCA", style_card_title)
        ],
        [
            Paragraph(
                "<b>Dirección:</b> Amapola # 15 int. 6 y 7, Col. La Florida, Ecatepec, Estado de México. CP. 55240<br/>"
                "<b>Teléfonos:</b> 5526640485 / 5544428732<br/>"
                "<b>Email:</b> soporte.rosistemasinfo@outlook.com.mx", style_card_body
            ),
            Paragraph(
                "<b>Dirección:</b> Sucursal Tizayuca, Hidalgo.<br/>"
                "<b>Teléfonos:</b> 5526640485 / 5544428732<br/>"
                "<b>Email:</b> soporte.rosistemasinfo@outlook.com.mx", style_card_body
            )
        ]
    ]
    t_sucursales = Table(sucursales_data, colWidths=[3.4*inch, 3.4*inch])
    t_sucursales.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_COLOR),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
        ('TOPPADDING', (0,0), (-1,-1), 15),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR)
    ]))
    story.append(t_sucursales)
    
    story.append(Spacer(1, 40))
    story.append(Paragraph("<font color='#00e676'><b>¿CÓMO SOLICITAR UNA COTIZACIÓN?</b></font>", style_h2))
    story.append(Paragraph(
        "1. Ingresa a nuestro sitio web oficial.<br/>"
        "2. Dirígete a la sección de **Contacto**.<br/>"
        "3. Escribe tu requerimiento o indica las categorías de productos del catálogo que necesitas.<br/>"
        "4. Nuestro equipo técnico procesará tu cotización y se pondrá en contacto contigo en menos de 24 horas.", style_body
    ))
    
    story.append(Spacer(1, 40))
    
    # Nota final al pie
    nota_final = Paragraph(
        "<font color='#a3a8b4'><i>CAOMI Sistemas Informáticos - Grupo RO+ © 2012-2026. Llevamos las mejores soluciones de "
        "soporte, software y redes a tu negocio.</i></font>", style_cover_subtitle
    )
    story.append(nota_final)

    # Construir el documento con el NumberedCanvas personalizado y callback de fondo
    doc.build(
        story, 
        onFirstPage=draw_background, 
        onLaterPages=draw_background, 
        canvasmaker=NumberedCanvas
    )

if __name__ == "__main__":
    build_pdf()
