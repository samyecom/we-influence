'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Observer } from 'gsap/Observer';
import './demo.css';

gsap.registerPlugin(ScrollTrigger, SplitText, Observer);

function Page() {
    const sectionsRef = useRef([]);
    const imagesRef = useRef([]);
    const headingsRef = useRef([]);
    const outerWrappersRef = useRef([]);
    const innerWrappersRef = useRef([]);
    const splitHeadingsRef = useRef([]);
    const currentIndexRef = useRef(-1);
    const animatingRef = useRef(false);

    useEffect(() => {
        const sections = sectionsRef.current;
        const images = imagesRef.current;
        const headings = headingsRef.current;
        const outerWrappers = outerWrappersRef.current;
        const innerWrappers = innerWrappersRef.current;
        
        const splitHeadings = headings.map(heading => 
            new SplitText(heading, { 
                type: "chars,words,lines", 
                linesClass: "clip-text" 
            })
        );
        
        splitHeadingsRef.current = splitHeadings;
        
        const wrap = gsap.utils.wrap(0, sections.length);

        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });

        function gotoSection(index, direction) {
            index = wrap(index);
            animatingRef.current = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => animatingRef.current = false
                });
            
            if (currentIndexRef.current >= 0) {
                gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
                tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor })
                  .set(sections[currentIndexRef.current], { autoAlpha: 0 });
            }
            
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
                yPercent: i => i ? -100 * dFactor : 100 * dFactor
            }, { 
                yPercent: 0 
            }, 0)
            .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
            .fromTo(splitHeadings[index].chars, { 
                autoAlpha: 0, 
                yPercent: 150 * dFactor
            }, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1,
                ease: "power2",
                stagger: {
                    each: 0.02,
                    from: "random"
                }
            }, 0.2);

            currentIndexRef.current = index;
        }

        const observer = Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
            onUp: () => !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
            tolerance: 10,
            preventDefault: true
        });

        gotoSection(0, 1);

        return () => {
            observer.kill();
            splitHeadings.forEach(instance => {
                if (instance && instance.revert) {
                    instance.revert();
                }
            });
        };
    }, []);

    return (
        <>
            <section ref={el => sectionsRef.current[0] = el} className="first">
                <div ref={el => outerWrappersRef.current[0] = el} className="outer">
                    <div ref={el => innerWrappersRef.current[0] = el} className="inner">
                        <div ref={el => imagesRef.current[0] = el} className="bg one">
                            <h2 ref={el => headingsRef.current[0] = el} className="section-heading text-white">Scroll down</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={el => sectionsRef.current[1] = el} className="second">
                <div ref={el => outerWrappersRef.current[1] = el} className="outer">
                    <div ref={el => innerWrappersRef.current[1] = el} className="inner">
                        <div ref={el => imagesRef.current[1] = el} className="bg bg-black">
                            <h2 ref={el => headingsRef.current[1] = el} className="section-heading text-white">Animated with GSAP</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={el => sectionsRef.current[2] = el} className="third">
                <div ref={el => outerWrappersRef.current[2] = el} className="outer">
                    <div ref={el => innerWrappersRef.current[2] = el} className="inner">
                        <div ref={el => imagesRef.current[2] = el} className="bg">
                            <h2 ref={el => headingsRef.current[2] = el} className="section-heading text-white">GreenSock</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={el => sectionsRef.current[3] = el} className="fourth">
                <div ref={el => outerWrappersRef.current[3] = el} className="outer">
                    <div ref={el => innerWrappersRef.current[3] = el} className="inner">
                        <div ref={el => imagesRef.current[3] = el} className="bg">
                            <h2 ref={el => headingsRef.current[3] = el} className="section-heading text-white">Animation platform</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={el => sectionsRef.current[4] = el} className="fifth">
                <div ref={el => outerWrappersRef.current[4] = el} className="outer">
                    <div ref={el => innerWrappersRef.current[4] = el} className="inner">
                        <div ref={el => imagesRef.current[4] = el} className="bg">
                            <h2 ref={el => headingsRef.current[4] = el} className="section-heading text-white">Keep scrolling</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Page;
