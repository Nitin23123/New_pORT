import React, { createContext, useContext, useState } from 'react';

// State Machine Phases
export const NAV_STATES = {
    IDLE: 'IDLE',
    EARTH_FOCUS: 'EARTH_FOCUS',
    BLACKOUT: 'BLACKOUT',
    CINEMATIC_TRANSITION: 'CINEMATIC_TRANSITION',
    DESTINATION_REVEAL: 'DESTINATION_REVEAL',
};

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [navState, setNavState] = useState(NAV_STATES.IDLE);
    const [targetPath, setTargetPath] = useState(null);

    // Called by Earth after zoom completes
    const triggerBlackout = (path) => {
        setTargetPath(path);
        setNavState(NAV_STATES.BLACKOUT);
    };

    // Called by CinematicTransition after blackout completes
    const startCinematic = () => {
        setNavState(NAV_STATES.CINEMATIC_TRANSITION);
    };

    // Called by CinematicTransition after frames complete
    const revealDestination = () => {
        setNavState(NAV_STATES.DESTINATION_REVEAL);
    };

    // Called after page is loaded and fade-out is done
    const endTransition = () => {
        setNavState(NAV_STATES.IDLE);
        setTargetPath(null);
    };

    // Legacy compatibility
    const isTransitioning = navState !== NAV_STATES.IDLE;

    return (
        <NavigationContext.Provider value={{
            navState,
            targetPath,
            isTransitioning,
            triggerBlackout,
            startCinematic,
            revealDestination,
            endTransition,
        }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
